import Overlay from '../components/Overlay.svelte';
import { Logger } from '../modules/logger';
import { perseUrl } from './url-type';

const logger = new Logger();

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

    const component = new Overlay({ target: document.body });
    component.$on('prev', () => navigate(parseResult.prevUrl));
    component.$on('next', () => navigate(parseResult.nextUrl));
}
