import { Table,Column,Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import  City  from "src/city/entities/city.entity";
import  Country  from "src/country/entities/country.entity";
import  Province  from "src/province/entities/province.entity";
import User from "src/user/entities/user.entity";

@Table
export  default class Address extends Model{
    
    @ForeignKey(()=>User)
    @Column
    user_id:number
    @BelongsTo(()=>User)
    user:User

    @Column
    address:string

    @Column
    postal_code:string


    @ForeignKey(()=>City)
    @Column
    city_id:number
    
    @ForeignKey(()=>Province)
    @Column
    province_id:number

    @ForeignKey(()=>Country)
    @Column
    country_id:number

    @BelongsTo(()=>Country)
    country:Country
    @BelongsTo(()=>Province)
    province:Province
    @BelongsTo(()=>City)
    city:City


}
