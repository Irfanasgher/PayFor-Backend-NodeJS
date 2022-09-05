import { BelongsTo, Column, ForeignKey, Table,Model } from "sequelize-typescript";
import Store from "src/store/entities/store.entity";
import StoreCategory from "src/store/entities/store_category.entity";
import User from "src/user/entities/user.entity";

@Table
export default class SubStore extends Model {
    
    @ForeignKey(()=>User)
    @Column
    user_id:number
    @BelongsTo(()=>User)
    user:User

    @ForeignKey(()=>Store)
    @Column
    store_id:number
    @BelongsTo(()=>Store)
    store:Store

    @Column
    sub_store_name:string

    @ForeignKey(()=>StoreCategory)
    @Column
    sub_store_category_id:number   
    @BelongsTo(()=>StoreCategory)
    storeCategory:StoreCategory


}