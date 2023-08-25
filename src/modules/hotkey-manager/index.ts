import hotkeys from 'hotkeys-js';

export class HotkeyManager implements IHotkeyManager {
    constructor(private logger: ILogger) {}

    public setHotKey(key: string, handler: () => void) {
        hotkeys(key, (event) => {
            // Prevent the default refresh event under WINDOWS system
            event.preventDefault();

            this.logger.log(`Hotkey detected: ${key}`);

            handler();
        });
    }
}
