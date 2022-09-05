import {Table,Model,Sequelize, Column, HasMany} from 'sequelize-typescript'
import  Account  from 'src/account/entities/account.entity'

@Table
export default class AccountType extends Model {
    
    @Column
    name: string

    @HasMany(()=>Account)
    account:Account[]
}
