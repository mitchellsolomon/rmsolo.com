# Mac → Photos album → website

The publishing source is the regular Apple Photos album **Website Photography**.
Anything added to this album is intended for public display on rmsolo.com.
Create the album in the system Photos library and add a few photos from your
Mac or iPhone. iCloud must finish syncing them to the Mac before export.

## What runs

- A locally compiled, ad-hoc-signed PhotoKit helper reads this one named album.
  macOS grants Photos access at library scope; the helper deliberately queries
  only the matching regular album and never modifies Photos or originals.
- Current edited versions are exported as sRGB JPEGs at quality 84%, up to
  2400px on the long edge, without cropping. Source metadata is not copied.
  Live Photos publish their still image; videos are skipped.
- A separate checkout under `~/Library/Application Support/RMSolo Photo Sync`
  commits only `src/assets/photography/synced` and
  `src/app/photography/photos.generated.ts`, then pushes to GitHub main.
  Vercel deploys the new commit. Your development checkout is not used by the job.
- A user LaunchAgent checks every five minutes while logged in and awake.
  Publishing also takes iCloud download and Vercel deployment time. Sleeping
  or offline Macs cannot publish; previously deployed photographs remain online.
- Unchanged photos are cached by asset modification date and content hash.
  No unchanged commits are created. A failed push is retried on a later run.

This approach suits a small portfolio (up to 200 album items). Images live in
Git history; large libraries should move to dedicated object storage instead.
Removing a photo from the album removes it from the next gallery deployment,
**but does not erase past Git commits or deployments**. An empty, missing,
duplicate-named, unauthorized, or partially unavailable album does not clear the
website. Exports finish before the publication manifest is replaced.

## Setup

Requires macOS, Apple's Command Line Tools, Python 3, and GitHub Git credentials.
The website gallery and sync files must be pushed to main before the first sync.

```sh
python3 scripts/photo-sync/install.py
open -W "$HOME/Library/Application Support/RMSolo Photo Sync/RMSolo Photo Sync.app" --args --authorize
```

Approve the macOS Photos prompt yourself. If needed, check System Settings →
Privacy & Security → Photos. Then add photos to the album and enable publishing:

The exporter must launch through `open`, not by executing its binary directly:
macOS associates Photos permission with the launched app identity. The runner
checks the export result explicitly because `open` does not return app exit codes.

```sh
python3 scripts/photo-sync/install.py --enable
```

This performs a first real sync before registering the background job. It does
not register the job if export or publishing fails. A missing or empty album
must be populated first.

## Run, monitor, or stop

Run once:

```sh
python3 "$HOME/Library/Application Support/RMSolo Photo Sync/sync.py" \
  --config "$HOME/Library/Application Support/RMSolo Photo Sync/config.json"
```

Inspect `sync.log` and `sync-error.log` in the same support folder, and inspect
Vercel for build failures. There is no automatic deployment-failure notification.
If a run leaves changes in the isolated checkout, inspect those files and finish
or undo that interrupted publication manually; the helper never resets work or
force-pushes. Remote divergence similarly stops publishing for manual resolution.

Stop background publishing:

```sh
python3 scripts/photo-sync/install.py --disable
```

Stopping leaves the website and local exports intact. Re-enable with `--enable`.
The scheduler uses a copy of `sync.py`; updates to the source script must also be
copied to the support folder while the job is stopped. Recompile/re-sign the
native helper when updating Swift code; macOS may ask for Photos access again.

Photos initially receive the generic alt text “Photograph by Mitchell Solomon”.
Descriptive per-photo captions are a follow-up enhancement. Never hand-edit the
generated manifest; the next sync replaces it. Manual static photo entries can
still be added in `photos.ts` alongside `syncedPhotographs`.

## Verification

```sh
python3 -m unittest discover -s scripts/photo-sync -p 'test_*.py'
xcrun swiftc scripts/photo-sync/PhotoExport.swift -o /tmp/PhotoExport
/tmp/PhotoExport --convert path/to/sample.jpg /tmp/photo-export-test
pnpm build
```

The conversion mode exercises resizing/JPEG export without accessing Photos.
