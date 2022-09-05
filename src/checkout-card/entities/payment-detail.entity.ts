import { Column, ForeignKey, Model, Table,BelongsTo } from "sequelize-typescript";
import InstallmentPayout from "src/installment-payout/entities/installment-payout.entity";
import OrderDetail from "src/order-detail/entities/order-detail.entity";
import User from "src/user/entities/user.entity";
import CheckoutCard from "./checkout-card.entity";

@Table
export default class checkoutPaymentDetails extends Model{

    @ForeignKey(()=>User)
    @Column
    user_id:number
    @BelongsTo(()=>User)
    user:User

    @ForeignKey(()=>CheckoutCard)
    @Column
    card_id:number
    @BelongsTo(()=>CheckoutCard)
    CheckoutCard:CheckoutCard

    @ForeignKey(()=>InstallmentPayout)
    @Column
    installment_id:number
    @BelongsTo(()=>InstallmentPayout)
    installmentPayout : InstallmentPayout

    @ForeignKey(()=>OrderDetail)
    @Column
    order_id:number
    @BelongsTo(()=>OrderDetail)
    orderDetail: OrderDetail

    @Column
    payment_id:string

    @Column
    status:string

    



}
