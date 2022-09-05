import { Column, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import SubStore from "src/sub-store/entities/sub-store.entity";
import Store from "./store.entity";
import StoreSubCategory from "./store_sub_category.entity";

@Table
export default class StoreCategory extends Model{

    @Column
    store_category_name:string

    @HasMany(()=>Store)
    store:Store[]

    @HasMany(()=>SubStore)
    subStore:SubStore[]
    
}