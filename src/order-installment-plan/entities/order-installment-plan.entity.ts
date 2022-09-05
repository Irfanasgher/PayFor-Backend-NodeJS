import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import  OrderDetail  from "src/order-detail/entities/order-detail.entity";
import  Store  from "src/store/entities/store.entity";

@Table
export default class OrderInstallmentPlan extends Model {

    @Column
    @ForeignKey(()=>Store)
    store_id?:number

    @BelongsTo(()=>Store)
    store:Store


    @Column
    @ForeignKey(()=>OrderDetail)
    order_id:number
    @BelongsTo(()=>OrderDetail)
    orderDetail : OrderDetail[]


    @Column
    installment_number:number

    @Column
    installment_amount:number

    @Column
    status:boolean


}
