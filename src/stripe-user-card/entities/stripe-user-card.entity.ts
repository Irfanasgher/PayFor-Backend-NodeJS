import { BelongsTo, Column, ForeignKey, Table, Model, HasMany } from "sequelize-typescript";
import StripeUserPayment from "src/stripe-user-payment/entities/stripe-user-payment.entity";
import User from "src/user/entities/user.entity";

@Table
export default class StripeUserCard extends Model {
    
    @ForeignKey(()=>User)
    @Column
    user_id:number
    @BelongsTo(()=>User)
    user:User

    @Column
    card_stripe_id:string

    @Column
    is_default:boolean

    @HasMany(()=>StripeUserPayment)
    stripeUserPayment:StripeUserPayment[]

}
