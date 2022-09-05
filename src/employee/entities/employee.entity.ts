import { Column, Table,ForeignKey,BelongsTo, Model } from "sequelize-typescript";
import Company from "src/company/entities/company.entity";
import Merchant from "src/merchant/entities/merchant.entity";
import Location from "src/location/entities/location.entity"
@Table
export default class Employee extends Model{
   
    
    @ForeignKey(()=>Company)
    @Column
    company_id:number
    @BelongsTo(()=>Company)
    company:Company

    @ForeignKey(()=>Merchant)
    @Column
    merchant_id:number
    @BelongsTo(()=>Merchant)
    merchant:Merchant

    @Column
    name:string

    @Column
    phone_number:string

    @Column
    email:string

    @ForeignKey(()=>Location)
    @Column
    location_id?:number
    @BelongsTo(()=>Location)
    location:Location

    @Column
    password:string

    @Column
    is_active:boolean



}
