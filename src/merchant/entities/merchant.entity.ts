import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import Company from "src/company/entities/company.entity";
import  Employee  from "src/employee/entities/employee.entity";

@Table
export default class Merchant extends Model{
    
    @ForeignKey(()=>Company)
    @Column
    company_id:number
    @BelongsTo(()=>Company)
    company:Company

    @Column
    contact_name:string

    @Column
    phone_number:string

    @Column
    email:string

    @Column
    address:string

    @Column
    password:string

    @Column
    role:string


    @HasMany(()=>Employee)
    employee:Employee[]

}
