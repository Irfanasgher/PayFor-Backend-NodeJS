import { BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table } from "sequelize-typescript";
import  ItemCategory  from "src/item-category/entities/item-category.entity";
import OrderDetail from "src/order-detail/entities/order-detail.entity";
import  Store  from "src/store/entities/store.entity";

@Table
export default class ItemDetail extends Model{

    @ForeignKey(()=>Store)
    @Column
    store_id?:number

    @BelongsTo(()=>Store)
    store:Store

    @ForeignKey(()=>ItemCategory)
    @Column
    item_cat_id?:number

    @BelongsTo(()=>ItemCategory)
    itemCategory:ItemCategory

    // column refers to nop commerece order_id
    @ForeignKey(()=>OrderDetail)
    @Column
    order_id:number
    @BelongsTo(()=>OrderDetail)
    orderDetail:OrderDetail

    @Column
    item_name:string

    @Column
    item_description:string

    @Column({type:DataType.FLOAT})
    item_price

    @Column
    item_image_url:string

    @Column
    item_size:string

    @Column({defaultValue:0})
    is_refunded:number



}
