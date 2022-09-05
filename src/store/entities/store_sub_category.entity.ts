import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";

@Table
export default class StoreSubCategory extends Model{
 

    @Column
    store_sub_category_name:string

    


}