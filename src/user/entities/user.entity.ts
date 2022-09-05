
import { Table, Column, Model, HasOne, HasMany } from 'sequelize-typescript';
import  Account  from 'src/account/entities/account.entity';
import Address from 'src/address/entities/address.entity';
import CheckoutCard from 'src/checkout-card/entities/checkout-card.entity';
import checkoutPaymentDetails from 'src/checkout-card/entities/payment-detail.entity';
import InstallmentPayout from 'src/installment-payout/entities/installment-payout.entity';
import  OrderDetail  from 'src/order-detail/entities/order-detail.entity';

import StripeUserCard from 'src/stripe-user-card/entities/stripe-user-card.entity';
import StripeUserPayment from 'src/stripe-user-payment/entities/stripe-user-payment.entity';
import SubStore  from 'src/sub-store/entities/sub-store.entity';
import  WishList  from 'src/wish-list/entities/wish-list.entity';


@Table
export default class User extends Model{

  @Column
  first_name: string;

  @Column
  last_name: string;

  @Column
  phone_number: string;

  @Column
  dob?: Date;

  @Column
  nic?: string;

  @Column
  stripe_customer_id?: string;

  @Column({defaultValue:75000})
  credit_limit: number;

  @Column
  status: string;

  @HasOne(()=>Account)
  account:Account

  @HasMany(()=>WishList)
  wishlist:WishList[]


  @HasMany(()=>OrderDetail)
  orderDetail:OrderDetail[]

  @HasMany(()=>InstallmentPayout)
  installmentPayOut:InstallmentPayout[]

  @HasMany(()=>StripeUserCard)
  stripeUserCard:StripeUserCard[]


  @HasMany(()=>StripeUserPayment)
  stripeUserPayment:StripeUserPayment[]

  @HasOne(()=>Address)
  address:Address

  @HasMany(()=>SubStore)
  subStore:SubStore[]

  @HasMany(()=>CheckoutCard)
  checkoutcard:CheckoutCard[]

  @HasMany(()=>checkoutPaymentDetails)
  paymentDetail : checkoutPaymentDetails[]
  
}
