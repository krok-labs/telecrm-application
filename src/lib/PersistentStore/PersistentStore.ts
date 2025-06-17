import { LazyStore, load, Store } from "@tauri-apps/plugin-store";

class PersistentStoreClass {
    public store = new LazyStore("store.json", { autoSave: true });
};

export const PersistentStore = new PersistentStoreClass();
