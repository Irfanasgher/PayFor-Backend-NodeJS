import { Column, ForeignKey, Model,BelongsTo, DataType, HasMany, HasOne, Table, } from "sequelize-typescript";
import Bank from "src/bank/entities/bank.entity";
import Location from "src/location/entities/location.entity";
import Merchant  from "src/merchant/entities/merchant.entity";
import Store from "src/store/entities/store.entity";
import { requiredFor } from "./storeType.enum";

@Table
export default class Company extends Model {
    
    @Column
    company_name:string

    @Column
    registration_number:string

    @Column
    expected_sale:string

    @Column
    website:string

    @Column 
    company_email:string

    @Column
    address:string

    @Column({ type: DataType.ENUM({ values: Object.keys(requiredFor) }) })
    required_for

    @Column
    logo:string

    

    @Column
    is_active:boolean

    @HasMany(()=>Merchant)
    client:Merchant[]

    @HasOne(()=>Bank)
    bank:Bank[]

    @HasMany(()=>Location)
    location:Location

    @HasOne(()=>Store)
    store:Store[]
    
}
