import { Column, ForeignKey, Model, Table,BelongsTo, HasMany } from "sequelize-typescript";
import User from "src/user/entities/user.entity";
import checkoutPaymentDetails from "./payment-detail.entity";

@Table
export default class CheckoutCard extends Model{

    @ForeignKey(()=>User)
    @Column
    user_id:number
    @BelongsTo(()=>User)
    user:User

    @Column
    token:string

    @Column
    instrument_id:string

    @Column
    card_holder_name:string

    @Column
    card_type:string

    @Column
    card_scheme:string

    @Column
    card_brand:string

    @Column
    is_primary:boolean

    @Column
    isForPayment:boolean

    @HasMany(()=>checkoutPaymentDetails)
    paymentDetail : checkoutPaymentDetails[]

}
