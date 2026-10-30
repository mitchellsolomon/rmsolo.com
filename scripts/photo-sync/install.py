#!/usr/bin/env python3
"""Install the local helper; scheduling is a separate explicit --enable step."""
import argparse
import json
import os
from pathlib import Path
import plistlib
import shutil
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[2]
SUPPORT = Path.home() / 'Library/Application Support/RMSolo Photo Sync'
APP = SUPPORT / 'RMSolo Photo Sync.app'
BINARY = APP / 'Contents/MacOS/PhotoExport'
LABEL = 'com.rmsolo.photo-sync'
PLIST = Path.home() / f'Library/LaunchAgents/{LABEL}.plist'

def run(*args):
    subprocess.run([str(a) for a in args], check=True)

parser = argparse.ArgumentParser()
parser.add_argument('--enable', action='store_true')
parser.add_argument('--disable', action='store_true')
args = parser.parse_args()
if args.disable:
    run('launchctl', 'bootout', f'gui/{os.getuid()}', PLIST)
    print('Background sync stopped. Exported photos and local configuration remain intact.')
    sys.exit(0)
if args.enable:
    config = json.loads((SUPPORT / 'config.json').read_text())
    # A successful explicit first publication is required before scheduling.
    run(sys.executable, SUPPORT / 'sync.py', '--config', SUPPORT / 'config.json')
    PLIST.parent.mkdir(parents=True, exist_ok=True)
    job = {
        'Label': LABEL,
        'ProgramArguments': [sys.executable, str(SUPPORT / 'sync.py'), '--config', str(SUPPORT / 'config.json')],
        'StartInterval': 300,
        'RunAtLoad': True,
        'ProcessType': 'Background',
        'EnvironmentVariables': {'PATH': '/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'},
        'StandardOutPath': str(SUPPORT / 'sync.log'),
        'StandardErrorPath': str(SUPPORT / 'sync-error.log'),
    }
    with PLIST.open('wb') as file:
        plistlib.dump(job, file)
    run('launchctl', 'bootstrap', f'gui/{os.getuid()}', PLIST)
    print('Sync enabled every five minutes while logged in and awake.')
    sys.exit(0)

if (SUPPORT / 'config.json').exists():
    raise SystemExit('Already installed. Stop the job before updating the helper; existing settings were not overwritten.')
BINARY.parent.mkdir(parents=True, exist_ok=True)
info = {
    'CFBundleIdentifier': LABEL, 'CFBundleName': 'RMSolo Photo Sync',
    'CFBundleExecutable': 'PhotoExport', 'CFBundlePackageType': 'APPL',
    'CFBundleVersion': '1', 'LSUIElement': True,
    'NSPhotoLibraryUsageDescription': 'Export only the Website Photography album to publish on rmsolo.com. No originals will be changed.',
}
with (APP / 'Contents/Info.plist').open('wb') as file:
    plistlib.dump(info, file)
run('xcrun', 'swiftc', '-O', ROOT / 'scripts/photo-sync/PhotoExport.swift', '-o', BINARY)
run('codesign', '--force', '--sign', '-', APP)
checkout = SUPPORT / 'checkout'
remote = 'https://github.com/mitchellsolomon/rmsolo.com.git'
run('git', 'clone', '--single-branch', '--branch', 'main', remote, checkout)
run('git', '-C', checkout, 'config', 'user.name', 'Mitchell Solomon')
email = subprocess.check_output(['git', '-C', str(ROOT), 'config', 'user.email'], text=True).strip()
if not email:
    raise SystemExit('Configure git user.email before installing.')
run('git', '-C', checkout, 'config', 'user.email', email)
shutil.copyfile(ROOT / 'scripts/photo-sync/sync.py', SUPPORT / 'sync.py')
config = {'album': 'Website Photography', 'remote': remote, 'checkout': str(checkout),
          'cache': str(SUPPORT / 'cache'), 'helper': str(BINARY)}
(SUPPORT / 'config.json').write_text(json.dumps(config, indent=2) + '\n')
print(f'Installed helper at {APP}. Background publishing is not enabled yet.')
print(f'Authorize: open -W "{APP}" --args --authorize')
print('Then run this installer with --enable after adding your test photos.')
