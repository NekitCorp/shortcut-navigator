import Options from '../components/Options.svelte';
import { HotkeyManager } from '../modules/hotkey-manager';
import { Logger } from '../modules/logger';
import { Storage } from '../modules/storage';

const target = document.getElementById('app');

const logger = new Logger();
const hotkeyManager = new HotkeyManager(logger);
const storage = new Storage(logger);

if (target) {
    storage.read().then(({ shortcuts }) => {
        new Options({
            target,
            props: {
                shortcuts,
                modules: {
                    storage,
                    hotkeyManager,
                },
            },
        });
    });
}
