import StoreSubCategory from "./store_sub_category.entity";

export const storeSubCategoryProvider = [
    {
        provide : 'STORE_SUB_CATEGORY_REPOSITORY',
        useValue : StoreSubCategory
    }
]