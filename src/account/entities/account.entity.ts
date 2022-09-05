import {Table,Column,Model, ForeignKey, BelongsTo} from 'sequelize-typescript'
import  AccountType  from 'src/account-type/entities/account-type.entity'
import  User  from 'src/user/entities/user.entity'

@Table
export default class Account extends Model {
    
    @Column
    email:string

    @Column
    password:string

    @ForeignKey(()=>User)
    @Column
    user_id:number

    @ForeignKey(()=>AccountType)
    account_type_id:number

    @BelongsTo(()=>User)
    user:User

    @BelongsTo(()=>AccountType)
    accountType:AccountType





}
