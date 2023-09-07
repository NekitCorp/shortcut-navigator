import { defineManifest } from '@crxjs/vite-plugin';
import packageJson from '../package.json';

const { version } = packageJson;

// Convert from Semver (example: 0.1.0-beta6)
const [major, minor, patch] = version
    // can only contain digits, dots, or dash
    .replace(/[^\d.-]+/g, '')
    // split into version parts
    .split(/[.-]/);

export default defineManifest({
    manifest_version: 3,
    name: 'Shortcut Navigator',
    description:
        'Navigate through websites using customizable shortcuts, boosting efficiency and minimizing clicks.',
    version: `${major}.${minor}.${patch}`,
    version_name: version,
    permissions: ['storage', 'contextMenus', 'activeTab'] as chrome.runtime.ManifestPermissions[],
    icons: {
        '16': 'src/assets/icons/icon-16.png',
        '32': 'src/assets/icons/icon-32.png',
        '48': 'src/assets/icons/icon-48.png',
        '128': 'src/assets/icons/icon-128.png',
    },
    content_scripts: [
        {
            matches: ['<all_urls>'],
            js: ['src/content/index.ts'],
        },
    ],
    background: {
        service_worker: 'src/background/index.ts',
    },
    options_ui: {
        page: 'src/options/options.html',
        open_in_tab: true,
    },
    action: {
        default_popup: 'src/action/action.html',
        default_icon: {
            '16': 'src/assets/icons/icon-16.png',
            '32': 'src/assets/icons/icon-32.png',
            '48': 'src/assets/icons/icon-48.png',
        },
        default_title: 'Feedback form',
    },
});
