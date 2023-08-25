export class Logger implements ILogger {
    private readonly prefix = 'Hotkey Navigator';
    private readonly prefixStyles = 'background: #232629; color: #ffffff';

    public log(message: string) {
        console.log(`%c ${this.prefix} %c ${message}`, this.prefixStyles, '');
    }

    public warn(message: string) {
        console.warn(`%c ${this.prefix} %c ${message}`, this.prefixStyles, '');
    }
}
