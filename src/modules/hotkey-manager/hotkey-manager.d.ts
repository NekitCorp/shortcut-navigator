interface IHotkeyManager {
    setHotKey(key: string, handler: () => void): void;
}
