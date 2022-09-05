import { BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import ShippingAddress from "src/address/entities/shippingAddress.entity";
import checkoutPaymentDetails from "src/checkout-card/entities/payment-detail.entity";
import InstallmentPayout from "src/installment-payout/entities/installment-payout.entity";
import ItemDetail from "src/item-details/entities/item-detail.entity";
import OrderInstallmentPlan from "src/order-installment-plan/entities/order-installment-plan.entity";
import  Store  from "src/store/entities/store.entity";
import  User  from "src/user/entities/user.entity";

@Table
export default class OrderDetail extends Model {
    
    @ForeignKey(()=>User)
    @Column
    user_id?:number

    @BelongsTo(()=>User)
    user:User

    @ForeignKey(()=>Store)
    store_id?:number

    @BelongsTo(()=>Store)
    store:Store

    @Column
    order_nop_id:string

    @Column({type:DataType.FLOAT})
    price

    @Column
    isoCurrency:string

    
    @Column({defaultValue: ''})
    payment_id:string

    @Column
    shipping_charges : number

    @Column
    assurance_amount : number

    @Column
    is_completed : boolean

    @Column
    order_pdf : string


    @HasMany(()=>OrderInstallmentPlan)
    orderInstallmentPlan:OrderInstallmentPlan[]

    @HasMany(()=>InstallmentPayout)
    installmentPayout:InstallmentPayout[]

    @HasMany(()=>ItemDetail)
    itemDetail:ItemDetail[]

    @HasMany(()=>checkoutPaymentDetails)
    paymentDetail : checkoutPaymentDetails


    @HasOne(()=>ShippingAddress)
    shippingAddress:ShippingAddress

}
