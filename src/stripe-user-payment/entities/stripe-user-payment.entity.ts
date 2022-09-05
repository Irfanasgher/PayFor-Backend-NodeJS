import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import OrderDetail from "src/order-detail/entities/order-detail.entity";
import StripeUserCard from "src/stripe-user-card/entities/stripe-user-card.entity";
import User from "src/user/entities/user.entity";

@Table
export default class StripeUserPayment extends Model{

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

    @ForeignKey(()=>StripeUserCard)
    @Column
    stripe_card_id:number
    @BelongsTo(()=>StripeUserCard)
    stripeUserCard:StripeUserCard

    @Column
    stripe_payment_id:string

    @Column
    payment_status:string
    

}
