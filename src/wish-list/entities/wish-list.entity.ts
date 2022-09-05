import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import  ItemDetail from "src/item-details/entities/item-detail.entity";
import  Store  from "src/store/entities/store.entity";
import  User  from "src/user/entities/user.entity";

@Table
export default class WishList extends Model {
    
    @ForeignKey(()=>User)
    @Column
    user_id:number

    @ForeignKey(()=>Store)
    @Column
    store_id:number

    @ForeignKey(()=>ItemDetail)
    @Column
    item_id:number

    @BelongsTo(()=>User)
    user:User

    @BelongsTo(()=>Store)
    store:Store

    @BelongsTo(()=>ItemDetail)
    itemDetail:ItemDetail


}
