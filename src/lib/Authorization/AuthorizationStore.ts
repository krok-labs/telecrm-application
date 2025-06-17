import { AUTHORIZATION_TOKEN_STORE_PATH, PersistentStore, type AuthorizationTokenStoreInterface } from "$lib/PersistentStore";
import { writable } from "svelte/store";
import { ApplicationConfiguration } from "../../config";

interface AuthorizedStoreInterface {
    authorizationToken: string,
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
        // Fetching current token from our store
        const authorizationToken = await PersistentStore.store.get<AuthorizationTokenStoreInterface>(AUTHORIZATION_TOKEN_STORE_PATH);
        if (authorizationToken) {
            // Checking fhit authorization token
            const { isValid } = (await (await fetch(`${ ApplicationConfiguration.apiUrl }/token/${ authorizationToken }`)).json());
            console.log(isValid);

            if (isValid) {
                // todo: get user information?
                this.update(() => {
                    return {
                        authorizationToken
                    };
                });
            };
        };
    };

    public isAuthorized() {
        return this.currentStore != null;
    };
};

export const AuthorizationStore = new AuthorizationStoreClass();
