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
        const id = info.menuItemId as ContextMenuItemId;

        if (parseResult !== null) {
            switch (id) {
                case ContextMenuItemId.Next: {
                    if (parseResult.nextUrl) {
                        chrome.tabs.update(tab.id, { url: parseResult.nextUrl });
                    }
                    break;
                }
                case ContextMenuItemId.Previous: {
                    if (parseResult.prevUrl) {
                        chrome.tabs.update(tab.id, { url: parseResult.prevUrl });
                    }
                    break;
                }
                case ContextMenuItemId.NextBlank: {
                    if (parseResult.nextUrl) {
                        chrome.tabs.create({ url: parseResult.nextUrl });
                    }
                    break;
                }
                case ContextMenuItemId.PreviousBlank: {
                    if (parseResult.prevUrl) {
                        chrome.tabs.create({ url: parseResult.prevUrl });
                    }
                    break;
                }
                case ContextMenuItemId.Navigate:
                    break;
                default:
                    ASSERT_EXHAUSTIVE(id);
            }
        }
    }
}

const enum ContextMenuItemId {
    Navigate = 'navigate',
    Previous = 'previous',
    Next = 'next',
    PreviousBlank = 'previous-blank',
    NextBlank = 'next-blank',
}

function handleInstalled(details: chrome.runtime.InstalledDetails) {
    const parent = chrome.contextMenus.create({
        title: 'Navigate to',
        contexts: ['all'],
        id: ContextMenuItemId.Navigate,
    });

    chrome.contextMenus.create({
        title: 'Previous page',
        parentId: parent,
        contexts: ['all'],
        id: ContextMenuItemId.Previous,
    });

    chrome.contextMenus.create({
        title: 'Next page',
        parentId: parent,
        contexts: ['all'],
        id: ContextMenuItemId.Next,
    });

    chrome.contextMenus.create({
        title: 'Previous page in a new tab',
        parentId: parent,
        contexts: ['all'],
        id: ContextMenuItemId.PreviousBlank,
    });

    chrome.contextMenus.create({
        title: 'Next page in a new tab',
        parentId: parent,
        contexts: ['all'],
        id: ContextMenuItemId.NextBlank,
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
        typeof message.blank === 'boolean' &&
        sender.tab?.id
    ) {
        if (message.blank) {
            chrome.tabs.create({ url: message.value });
        } else {
            chrome.tabs.update(sender.tab.id, { url: message.value });
        }
    }
}
