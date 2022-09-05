import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import InstoreLink from "./instore-link.entity";

@Table
export default class InstoreInstallment extends Model{
    
    @ForeignKey(()=>InstoreLink)
    @Column
    order_id:number
    @BelongsTo(()=>InstoreLink)
    InstoreLink:InstoreLink

    @Column({type:DataType.FLOAT})
    installment_amount

    @Column({type:DataType.DATEONLY})
    due_date

    @Column({type:DataType.DATEONLY})
    paid_at

    @Column({defaultValue:0})
    is_paid:number

}