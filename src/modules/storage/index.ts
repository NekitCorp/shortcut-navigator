export class Storage implements IStorage {
    private DEFAULT_STORAGE_DATA: StorageData = {
        shortcuts: [
            { type: 'prevUrl', key: 'ctrl+left' },
            { type: 'prevUrl', key: '⌥+left' },
            { type: 'nextUrl', key: 'ctrl+right' },
            { type: 'nextUrl', key: '⌥+right' },
        ],
    };

    constructor(private logger: ILogger) {}

    public read(): Promise<StorageData> {
        return new Promise((res, rej) => {
            try {
                chrome.storage.local.get(null, (data) => {
                    this.logger.log(`Read data from storage: ${JSON.stringify(data)}.`);

                    res({ ...this.DEFAULT_STORAGE_DATA, ...data });
                });
            } catch (error) {
                rej(error);
            }
        });
    }

    public write(data: Partial<StorageData>): Promise<void> {
        return new Promise((res, rej) => {
            try {
                chrome.storage.local.set(data, () => {
                    this.logger.log(`Write data to storage: ${JSON.stringify(data)}.`);

                    res();
                });
            } catch (error) {
                rej(error);
            }
        });
    }
}
