import { BelongsTo, Column, ForeignKey, Table,Model, HasMany, HasOne } from "sequelize-typescript";
import FeaturedStore from "src/featured-store/entities/featured-store.entity";
import  ItemDetail  from "src/item-details/entities/item-detail.entity";
import  OrderInstallmentPlan  from "src/order-installment-plan/entities/order-installment-plan.entity";
import  OrderDetail  from "src/order-detail/entities/order-detail.entity";
import TopStore from "src/top-store/entities/top-store.entity";
import  User  from "src/user/entities/user.entity";
import  WishList  from "src/wish-list/entities/wish-list.entity";
import StoreCategory from "./store_category.entity";
import StoreSubCategory from "./store_sub_category.entity";
import SubStore from "src/sub-store/entities/sub-store.entity";
import Company from "src/company/entities/company.entity";
import InstoreLink from "src/instore-link/entities/instore-link.entity";

@Table
export default class Store extends Model {

    @ForeignKey(()=>Company)
    @Column
    company_id?:number

    @ForeignKey(()=>StoreCategory)
    store_category_id?:number
    @BelongsTo(()=>StoreCategory)
    storeCategory:StoreCategory


    @ForeignKey(()=>StoreSubCategory)
    store_sub_category_id?:number
    @BelongsTo(()=>StoreSubCategory)
    storeSubCategory:StoreSubCategory
    
    @Column
    name:string

    @Column
    logo?:string

    @Column
    cover_image_url?:string

    @Column
    url:string

    @BelongsTo(()=>Company)
    company:Company

    @HasMany(()=>WishList)
    wishList:WishList[]


    @HasMany(()=>OrderDetail)
    orderDetail:OrderDetail[]

    @HasMany(()=>ItemDetail)
    itemDetail:ItemDetail[]

    @HasMany(()=>OrderInstallmentPlan)
    OrderInstallmentPlan : OrderInstallmentPlan[]

    @HasOne(()=>FeaturedStore)
    featureStore:FeaturedStore

    @HasOne(()=>TopStore)
    topStore:TopStore

    @HasMany(()=>SubStore)
    subStore:SubStore[]

    @HasMany(()=>InstoreLink)
    instore:InstoreLink[]

}
