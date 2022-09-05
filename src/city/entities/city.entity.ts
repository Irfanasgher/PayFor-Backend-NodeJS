import { Column, HasMany, Model, Table } from "sequelize-typescript";
import  Address  from "src/address/entities/address.entity";

@Table
export default class City extends Model{
    
    @Column
    name:string

    @HasMany(()=>Address)
    address:Address[]

}
