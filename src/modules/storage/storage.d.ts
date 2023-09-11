type ShortcutType = 'nextUrl' | 'prevUrl' | 'nextUrlBlank' | 'prevUrlBlank';

type Shortcut = {
    key: string;
    type: ShortcutType;
};

type StorageData = {
    shortcuts: Shortcut[];
};

interface IStorage {
    read: () => Promise<StorageData>;
    write: (data: StorageData) => Promise<void>;
}
