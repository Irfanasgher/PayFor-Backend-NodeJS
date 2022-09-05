import FeaturedStore from "./featured-store.entity";

export const featureStoreProvider = [
    {
        provide : 'FEATURE_STORE_REPOSITORY',
        useValue : FeaturedStore
    }
]