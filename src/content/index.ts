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
    logger.log(`Prev url: ${parseResult.prevUrl}`);
    logger.log(`Next url: ${parseResult.nextUrl}`);

    hotkeyManager.setHotKey('ctrl+left, option+left', () => navigate(parseResult.prevUrl));
    hotkeyManager.setHotKey('ctrl+right, option+right', () => navigate(parseResult.nextUrl));
}
