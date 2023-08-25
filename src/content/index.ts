import { HotkeyManager } from '../modules/hotkey-manager';
import { Logger } from '../modules/logger';
import { perseUrl } from './url-type';

const logger = new Logger();
const hotkeyManager = new HotkeyManager(logger);

// TODO: module
const parseResult = perseUrl(window.location.href, logger);

function navigate(url: string): void {
    logger.log(`Navigate to: ${url}`);

    chrome.runtime.sendMessage({
        type: 'change_url',
        value: url,
    });
}

if (parseResult === null) {
    logger.warn(
        `Failed to parse url: ${window.location.href}. ID not found. ` +
            `Need to add hostname "${window.location.hostname}" to database for special processing.`,
    );
} else {
    logger.log(`Prev url: ${parseResult.prevUrl}`);
    logger.log(`Next url: ${parseResult.nextUrl}`);

    hotkeyManager.setHotKey('ctrl+left, option+left', () => navigate(parseResult.prevUrl));
    hotkeyManager.setHotKey('ctrl+right, option+right', () => navigate(parseResult.nextUrl));
}
