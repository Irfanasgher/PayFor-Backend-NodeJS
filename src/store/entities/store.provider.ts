import Store from "./store.entity";

export const storeProvider = [
    {
        provide : 'STORE_RESPOSITORY',
        useValue : Store
    }
]