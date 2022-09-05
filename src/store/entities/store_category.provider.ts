import StoreCategory from "./store_category.entity";

export const storeCategoryProvider = [
    {
        provide : 'STORE_CATEGORY_REPOSITORY',
        useValue : StoreCategory
    }
]