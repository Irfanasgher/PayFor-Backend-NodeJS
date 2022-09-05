import {DataTypes} from "sequelize";
import { Column, ForeignKey, Table,Model, BelongsTo, HasMany, DataType} from "sequelize-typescript";
import checkoutPaymentDetails from "src/checkout-card/entities/payment-detail.entity";
import OrderDetail from "src/order-detail/entities/order-detail.entity";
import User from "src/user/entities/user.entity";
@Table
export default class InstallmentPayout extends Model {
    
    @ForeignKey(()=>User)
    @Column
    user_id:number
    @BelongsTo(()=>User)
    user:User
    
    @ForeignKey(()=>OrderDetail)
    @Column
    order_id:number
    @BelongsTo(()=>OrderDetail)
    orderDetail:OrderDetail

    @Column({type:DataType.FLOAT})
    installment_amount

    @Column
    is_paid:number

    @Column({ type: DataType.DATEONLY })
    due_date

    @Column
    paid_at:Date

    @Column
    surcharge:number

    @Column({type:DataType.FLOAT})
    remaining_amount

    @HasMany(()=>checkoutPaymentDetails)
    paymentDetail : checkoutPaymentDetails


}
