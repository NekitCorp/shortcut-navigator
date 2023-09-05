interface IHotkeyManager {
    ALL_KEYS: string;

    setHotKey(key: string, handler: HotkeyHandler, options?: HotkeyOptions): () => void;
}

type HotkeyHandler = (params: {
    shortcut: string;
    isModifierPressed: boolean;
    isLetterPressed: boolean;
}) => void;

interface HotkeyOptions {
    element?: HTMLElement | undefined;
    /**
     * By default hotkeys are not enabled for INPUT, SELECT, TEXTAREA elements.
     * @link https://github.com/jaywcjlove/hotkeys-js/tree/master#filter
     */
    hotkeysInInputs?: boolean | undefined;
}
