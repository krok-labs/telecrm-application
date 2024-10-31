import { writable } from "svelte/store";

interface AuthorizedStoreInterface {

};

type AuthorizationStoreInterface = AuthorizedStoreInterface | null;

class AuthorizationStoreClass {
    public subscribe;
    private update;

    private currentStore: AuthorizationStoreInterface = null;

    constructor() {
        const { subscribe, update } = writable<AuthorizationStoreInterface>(this.currentStore);

        this.subscribe = subscribe;
        this.update = update;

        subscribe((obj) => {
            this.currentStore = obj;
        });
    };

    public async initialize() {

    };

    public isAuthorized() {
        return this.currentStore != null;
    };
};

export const AuthorizationStore = new AuthorizationStoreClass();
