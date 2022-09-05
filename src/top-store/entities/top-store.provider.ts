import TopStore from "./top-store.entity";

export const topStoreProvider = [
    {
        provide:'TOP_STORE_REPOSITORY',
        useValue:TopStore
    }
]