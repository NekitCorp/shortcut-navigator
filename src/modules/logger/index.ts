export class Logger implements ILogger {
    private readonly prefix = 'Hotkey Navigator';
    private readonly prefixStyles = 'background: #232629; color: #ffffff';

    public log(message: string, data?: any) {
        if (data) {
            console.log(`%c ${this.prefix} %c ${message}`, this.prefixStyles, '', data);
        } else {
            console.log(`%c ${this.prefix} %c ${message}`, this.prefixStyles, '');
        }
    }
}
