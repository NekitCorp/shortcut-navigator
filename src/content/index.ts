import { HotkeyManager } from '../modules/hotkey-manager';
import { Logger } from '../modules/logger';
import { UrlManager } from '../modules/url-manager';

const logger = new Logger();
const hotkeyManager = new HotkeyManager(logger);
const urlManager = new UrlManager(logger);

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

    if (prevUrl) {
        hotkeyManager.setHotKey('ctrl+left, option+left', () => navigate(prevUrl));
    }
    if (nextUrl) {
        hotkeyManager.setHotKey('ctrl+right, option+right', () => navigate(nextUrl));
    }
}
