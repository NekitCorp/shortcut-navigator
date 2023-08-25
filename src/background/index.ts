import { Logger } from '../modules/logger';

const logger = new Logger();

chrome.runtime.onMessage.addListener((msg, sender) => {
    logger.log(`Received message from ${sender.tab?.id}: ${JSON.stringify(msg)}`);

    if (msg && msg.type == 'change_url' && typeof msg.value === 'string' && sender.tab?.id) {
        chrome.tabs.update(sender.tab.id, { url: msg.value });
    }
});

logger.log('Background script initialized.');
