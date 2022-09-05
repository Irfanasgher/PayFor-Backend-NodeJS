import { Column, Model, Table } from "sequelize-typescript";

@Table
export default class ForgetPassword extends Model {
    @Column
    email:string

    @Column
    code:number

    @Column
    is_verified:boolean
}
