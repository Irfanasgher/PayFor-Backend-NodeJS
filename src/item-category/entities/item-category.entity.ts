import { Column, HasMany, Model, Table } from "sequelize-typescript";
import  ItemDetail  from "src/item-details/entities/item-detail.entity";

@Table
export default class ItemCategory extends Model{

    @Column
    name:String

    @HasMany(()=>ItemDetail)
    itemDetail:ItemDetail[]


}
