import ItemDetail from "./item-detail.entity";

export const itemDetailProvider = [
    {
        provide:'ITEM_DETAIL_REPOSITORY',
        useValue:ItemDetail
    }
]