
import { Table, Column, Model, ForeignKey, BelongsTo, } from 'sequelize-typescript';
import User from './user.entity';


@Table
export default class UserCreditLimit extends Model{

    @ForeignKey(()=>User)
    @Column
    user_id:number
    @BelongsTo(()=>User)
    user:User


    @Column({defaultValue: 75000})
    credit_time:number

  
}
