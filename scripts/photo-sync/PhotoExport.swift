import Foundation
import Photos
import ImageIO
import UniformTypeIdentifiers
import CryptoKit
import CoreGraphics

struct SyncError: Error, CustomStringConvertible {
    let description: String
    init(_ message: String) { description = message }
}
struct Photo: Codable {
    let id: String
    let file: String
    let fingerprint: String
    let width: Int
    let height: Int
}
func digest(_ data: Data) -> String { SHA256.hash(data: data).map { String(format: "%02x", $0) }.joined() }
func jpeg(_ data: Data, to directory: URL) throws -> (String, Int, Int) {
    guard let source = CGImageSourceCreateWithData(data as CFData, nil),
          let image = CGImageSourceCreateThumbnailAtIndex(source, 0, [
            kCGImageSourceCreateThumbnailFromImageAlways: true,
            kCGImageSourceCreateThumbnailWithTransform: true,
            kCGImageSourceThumbnailMaxPixelSize: 2400,
          ] as CFDictionary),
          let space = CGColorSpace(name: CGColorSpace.sRGB),
          let context = CGContext(data: nil, width: image.width, height: image.height,
            bitsPerComponent: 8, bytesPerRow: 0, space: space,
            bitmapInfo: CGImageAlphaInfo.noneSkipLast.rawValue)
    else { throw SyncError("Cannot decode or resize image") }
    context.setFillColor(CGColor(gray: 1, alpha: 1))
    context.fill(CGRect(x: 0, y: 0, width: image.width, height: image.height))
    context.interpolationQuality = .high
    context.draw(image, in: CGRect(x: 0, y: 0, width: image.width, height: image.height))
    guard let rendered = context.makeImage() else { throw SyncError("Cannot render sRGB image") }
    let output = NSMutableData()
    guard let destination = CGImageDestinationCreateWithData(output, UTType.jpeg.identifier as CFString, 1, nil)
    else { throw SyncError("Cannot create JPEG") }
    // A fresh CGImage carries no source EXIF, GPS, captions, or original filename.
    CGImageDestinationAddImage(destination, rendered, [kCGImageDestinationLossyCompressionQuality: 0.84] as CFDictionary)
    guard CGImageDestinationFinalize(destination) else { throw SyncError("Cannot finish JPEG") }
    let bytes = output as Data
    let file = digest(bytes) + ".jpg"
    try bytes.write(to: directory.appendingPathComponent(file), options: .atomic)
    return (file, image.width, image.height)
}
func authorize() throws {
    var status = PHPhotoLibrary.authorizationStatus(for: .readWrite)
    if status == .notDetermined {
        let done = DispatchSemaphore(value: 0)
        PHPhotoLibrary.requestAuthorization(for: .readWrite) { result in status = result; done.signal() }
        guard done.wait(timeout: .now() + 120) == .success else { throw SyncError("Photos permission request timed out") }
    }
    guard status == .authorized else { throw SyncError("Allow Photos access for RMSolo Photo Sync in System Settings > Privacy & Security > Photos") }
    print("Photos access authorized. Only the configured publishing album will be exported.")
}
func export(album: String, to directory: URL) throws {
    guard PHPhotoLibrary.authorizationStatus(for: .readWrite) == .authorized else {
        throw SyncError("Photos access has not been granted. Run the helper with --authorize first.")
    }
    let options = PHFetchOptions()
    options.predicate = NSPredicate(format: "title == %@", album)
    let albums = PHAssetCollection.fetchAssetCollections(with: .album, subtype: .albumRegular, options: options)
    guard albums.count == 1, let collection = albums.firstObject else {
        throw SyncError("Expected exactly one regular album named '\(album)'; found \(albums.count). No changes published.")
    }
    let assets = PHAsset.fetchAssets(in: collection, options: nil)
    guard assets.count <= 200 else { throw SyncError("Album exceeds the 200-item limit for repository storage. Use dedicated image storage for a larger library.") }
    let manifest = directory.appendingPathComponent("manifest.json")
    let old = (try? JSONDecoder().decode([Photo].self, from: Data(contentsOf: manifest))) ?? []
    let previous = Dictionary(uniqueKeysWithValues: old.map { ($0.id, $0) })
    var photos: [Photo] = []
    for index in 0..<assets.count {
        let asset = assets.object(at: index)
        guard asset.mediaType == .image else { continue }
        guard !asset.isHidden else { throw SyncError("The publishing album contains a hidden photo. Remove it from the album before syncing.") }
        let id = digest(Data(asset.localIdentifier.utf8))
        let fingerprint = "v1-\(asset.modificationDate?.timeIntervalSince1970 ?? 0)-\(asset.pixelWidth)-\(asset.pixelHeight)"
        if let cached = previous[id], cached.fingerprint == fingerprint,
           FileManager.default.fileExists(atPath: directory.appendingPathComponent(cached.file).path) {
            photos.append(cached)
            continue
        }
        let request = PHImageRequestOptions()
        request.version = .current
        request.deliveryMode = .highQualityFormat
        request.isNetworkAccessAllowed = true
        let done = DispatchSemaphore(value: 0)
        var received: Data?
        var requestError: Error?
        let requestID = PHImageManager.default().requestImageDataAndOrientation(for: asset, options: request) { data, _, _, info in
            received = data
            requestError = info?[PHImageErrorKey] as? Error
            done.signal()
        }
        guard done.wait(timeout: .now() + 180) == .success else {
            PHImageManager.default().cancelImageRequest(requestID)
            throw SyncError("iCloud download timed out; the published gallery is unchanged")
        }
        if let error = requestError { throw error }
        guard let data = received else { throw SyncError("A photo is unavailable; the published gallery is unchanged") }
        let (file, width, height) = try jpeg(data, to: directory)
        photos.append(Photo(id: id, file: file, fingerprint: fingerprint, width: width, height: height))
    }
    guard !photos.isEmpty else { throw SyncError("Album contains no available photos. Add photos and wait for iCloud to sync. Empty albums never clear the website automatically.") }
    let encoder = JSONEncoder()
    encoder.outputFormatting = [.prettyPrinted, .sortedKeys]
    // Publish a manifest only after every requested image has exported successfully.
    try encoder.encode(photos).write(to: manifest, options: .atomic)
    print("Exported \(photos.count) photographs from '\(album)'.")
}
let arguments = Array(CommandLine.arguments.dropFirst())
DispatchQueue.global().async {
    do {
        if arguments == ["--authorize"] || arguments.isEmpty {
            try authorize()
        } else if arguments.count == 3 && arguments[0] == "--export" {
            let directory = URL(fileURLWithPath: arguments[2], isDirectory: true)
            try FileManager.default.createDirectory(at: directory, withIntermediateDirectories: true)
            try export(album: arguments[1], to: directory)
        } else if arguments.count == 3 && arguments[0] == "--convert" {
            let directory = URL(fileURLWithPath: arguments[2], isDirectory: true)
            try FileManager.default.createDirectory(at: directory, withIntermediateDirectories: true)
            let result = try jpeg(Data(contentsOf: URL(fileURLWithPath: arguments[1])), to: directory)
            print("\(result.0) \(result.1)x\(result.2)")
        } else { throw SyncError("Usage: --authorize | --export ALBUM OUTPUT | --convert IMAGE OUTPUT") }
        exit(0)
    } catch {
        FileHandle.standardError.write(Data("Photo sync: \(error)\n".utf8))
        exit(1)
    }
}
dispatchMain()
