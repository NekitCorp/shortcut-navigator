import hotkeys, { type KeyHandler } from 'hotkeys-js';

export class HotkeyManager implements IHotkeyManager {
    public ALL_KEYS = '*';

    constructor(private logger: ILogger) {}

    public setHotKey(key: string, handler: HotkeyHandler, options: HotkeyOptions = {}): () => void {
        const { element, hotkeysInInputs } = options;

        this.logger.log(`Shortcut registration: "${key}".`);

        const keyHandler: KeyHandler = (event) => {
            if (event.target instanceof HTMLInputElement && event.target.readOnly) {
                return;
            }

            // Prevent the default refresh event under WINDOWS system
            event.preventDefault();

            const keys = hotkeys.getPressedKeyString();
            const isModifierPressed = keys.some((key) => hotkeys.modifier[key]);
            const isLetterPressed = keys.some((key) => !hotkeys.modifier[key]);
            const shortcut = keys.join('+');

            this.logger.log(`Shortcut detected: "${key}". Keys: "${shortcut}".`);

            handler({ shortcut, isModifierPressed, isLetterPressed });
        };

        if (hotkeysInInputs) {
            hotkeys.filter = function (event) {
                return true;
            };
        }

        if (element) {
            hotkeys(key, { element }, keyHandler);
        } else {
            hotkeys(key, keyHandler);
        }

        return () => hotkeys.unbind(key, keyHandler);
    }
}
