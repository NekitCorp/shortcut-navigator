import { Logger } from '../modules/logger';
import { UrlManager } from '../modules/url-manager';

const logger = new Logger();
const urlManager = new UrlManager(logger);

chrome.runtime.onInstalled.addListener(handleInstalled);
chrome.contextMenus.onClicked.addListener(handleContextMenusClick);
chrome.runtime.onMessage.addListener(handleMessage);

logger.log('Background script initialized.');

function handleContextMenusClick(info: chrome.contextMenus.OnClickData, tab?: chrome.tabs.Tab) {
    logger.log(`Context menu clicked:`, { info, tab });

    if (tab?.id && info.parentMenuItemId === 'navigate') {
        const parseResult = urlManager.perseUrl(info.pageUrl);

        if (parseResult !== null) {
            if (info.menuItemId === 'next' && parseResult.nextUrl) {
                chrome.tabs.update(tab.id, { url: parseResult.nextUrl });
            }

            if (info.menuItemId === 'prev' && parseResult.prevUrl) {
                chrome.tabs.update(tab.id, { url: parseResult.prevUrl });
            }
        }
    }
}

function handleInstalled(details: chrome.runtime.InstalledDetails) {
    const parent = chrome.contextMenus.create({
        title: 'Navigate to',
        contexts: ['all'],
        id: 'navigate',
    });

    chrome.contextMenus.create({
        title: 'Previous page',
        parentId: parent,
        contexts: ['all'],
        id: 'prev',
    });

    chrome.contextMenus.create({
        title: 'Next page',
        parentId: parent,
        contexts: ['all'],
        id: 'next',
    });
}

function handleMessage(
    message: any,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: any) => void,
) {
    logger.log(`Received message:`, { sender, message });

    if (
        message &&
        message.type == 'change_url' &&
        typeof message.value === 'string' &&
        sender.tab?.id
    ) {
        chrome.tabs.update(sender.tab.id, { url: message.value });
    }
}
