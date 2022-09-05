import { Table,Column,Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import OrderDetail from "src/order-detail/entities/order-detail.entity";

@Table
export  default class ShippingAddress extends Model{
    
    @ForeignKey(()=>OrderDetail)
    @Column
    order_id:number
    @BelongsTo(()=>OrderDetail)
    orderDetail:OrderDetail

    @Column
    address:string

    @Column
    postal_code:string

    @Column
    city:string

    @Column
    country:string

    @Column
    province:string




}
