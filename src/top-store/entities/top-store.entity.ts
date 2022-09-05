import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import Store from "src/store/entities/store.entity";

@Table
export default class TopStore extends Model{
    
    @ForeignKey(()=>Store)
    @Column
    store_id:number
    @BelongsTo(()=>Store)
    store:Store
}
