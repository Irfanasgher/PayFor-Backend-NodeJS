import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import Company from "src/company/entities/company.entity";

@Table
export default class Bank extends Model{

    @ForeignKey(()=>Company)
    @Column
    company_id:number
    @BelongsTo(()=>Company)
    company:Company


    @Column
    bank_name:string

    @Column
    branch_code:string

    
    @Column
    account_name:string

    @Column
    account_number:string

    @Column
    currency:string

    @Column
    bank_statement:string


}
