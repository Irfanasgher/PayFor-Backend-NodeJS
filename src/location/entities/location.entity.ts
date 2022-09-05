import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import Company from "src/company/entities/company.entity";
import Employee from "src/employee/entities/employee.entity";

@Table
export default class Location extends Model{

    @ForeignKey(()=>Company)
    @Column
    company_id:number
    @BelongsTo(()=>Company)
    company:Company
    
    @Column
    title:string


    @Column
    code:string

    @HasMany(()=>Employee)
    employee:Employee[]

}
