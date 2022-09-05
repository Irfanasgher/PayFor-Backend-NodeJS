import { Column, DataType, Model, Table, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import Store from "src/store/entities/store.entity";
import InstoreInstallment from "./instore-installments.entity";

@Table
export default class InstoreLink extends Model{

    @ForeignKey(()=>Store)
    @Column
    store_id:number
    @BelongsTo(()=>Store)
    store:Store

    @Column
    name:string

    @Column
    phone_number:string

    @Column
    invoice_no:string

    @Column({type:DataType.FLOAT})
    total_amount

    @Column
    payment_type:string

    @HasMany(()=>InstoreInstallment)
    instoreInstallment : InstoreInstallment[]

}
