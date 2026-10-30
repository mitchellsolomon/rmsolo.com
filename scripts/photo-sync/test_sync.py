import hashlib
import json
from pathlib import Path
import tempfile
import unittest
from sync import prepare, ASSETS, GENERATED

class PublicationTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.cache, self.repo = self.root / 'cache', self.root / 'repo'
        self.cache.mkdir()
        (self.repo / GENERATED).parent.mkdir(parents=True)
        self.photos = []

    def photo(self, value, identity='a'):
        data = value.encode()
        file = hashlib.sha256(data).hexdigest() + '.jpg'
        (self.cache / file).write_bytes(data)
        return dict(id=identity * 64, file=file, width=1200, height=800)

    def manifest(self, photos):
        (self.cache / 'manifest.json').write_text(json.dumps(photos))

    def test_deterministic_export_and_shared_image_import(self):
        photo = self.photo('image')
        self.manifest([photo, {**photo, 'id': 'b' * 64}])
        self.assertEqual(prepare(self.cache, self.repo), 2)
        first = (self.repo / GENERATED).read_text()
        prepare(self.cache, self.repo)
        self.assertEqual(first, (self.repo / GENERATED).read_text())
        self.assertEqual(first.count('import photo'), 1)
        self.assertEqual(first.count('src: photo0'), 2)

    def test_missing_or_corrupt_export_preserves_published_files(self):
        photo = self.photo('first')
        self.manifest([photo])
        prepare(self.cache, self.repo)
        before = (self.repo / GENERATED).read_bytes()
        (self.cache / photo['file']).write_bytes(b'corrupt')
        with self.assertRaisesRegex(ValueError, 'checksum'):
            prepare(self.cache, self.repo)
        self.assertEqual(before, (self.repo / GENERATED).read_bytes())
        self.assertEqual((self.repo / ASSETS / photo['file']).read_bytes(), b'first')

    def test_empty_album_does_not_clear_gallery(self):
        self.manifest([])
        with self.assertRaisesRegex(ValueError, 'empty'):
            prepare(self.cache, self.repo)
        self.assertFalse((self.repo / GENERATED).exists())

    def test_path_traversal_rejected(self):
        self.manifest([dict(id='a' * 64, file='../secret.jpg', width=1, height=1)])
        with self.assertRaisesRegex(ValueError, 'filename'):
            prepare(self.cache, self.repo)

    def test_removals_only_affect_generated_assets(self):
        first, second = self.photo('first'), self.photo('second', 'b')
        self.manifest([first, second])
        prepare(self.cache, self.repo)
        manual = self.repo / 'src/assets/photography/manual.jpg'
        manual.write_bytes(b'manual')
        self.manifest([second])
        prepare(self.cache, self.repo)
        self.assertFalse((self.repo / ASSETS / first['file']).exists())
        self.assertTrue((self.repo / ASSETS / second['file']).exists())
        self.assertEqual(manual.read_bytes(), b'manual')

if __name__ == '__main__':
    unittest.main()
