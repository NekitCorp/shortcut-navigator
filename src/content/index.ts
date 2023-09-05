import { HotkeyManager } from '../modules/hotkey-manager';
import { Logger } from '../modules/logger';
import { Storage } from '../modules/storage';
import { UrlManager } from '../modules/url-manager';

const logger = new Logger();
const hotkeyManager = new HotkeyManager(logger);
const urlManager = new UrlManager(logger);
const storage = new Storage(logger);

const parseResult = urlManager.perseUrl(window.location.href);

function navigate(url: string): void {
    logger.log(`Navigate to: ${url}`);

    chrome.runtime.sendMessage({
        type: 'change_url',
        value: url,
    });
}

if (parseResult === null) {
    logger.log(
        `Failed to parse url: ${window.location.href}. ID not found. ` +
            `Need to add hostname "${window.location.hostname}" to database for special processing.`,
    );
} else {
    const { nextUrl, prevUrl } = parseResult;

    logger.log(`Prev url: ${prevUrl}`);
    logger.log(`Next url: ${nextUrl}`);

    storage.read().then(({ shortcuts }) => {
        if (prevUrl) {
            shortcuts
                .filter((shortcut) => shortcut.type === 'prevUrl' && shortcut.key)
                .forEach((shortcut) => {
                    hotkeyManager.setHotKey(shortcut.key, () => navigate(prevUrl));
                });
        }
        if (nextUrl) {
            shortcuts
                .filter((shortcut) => shortcut.type === 'nextUrl' && shortcut.key)
                .forEach((shortcut) => {
                    hotkeyManager.setHotKey(shortcut.key, () => navigate(nextUrl));
                });
        }
    });
}
