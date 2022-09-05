import { Table, Column, Model } from 'sequelize-typescript';

@Table
export default class Otp extends Model{
    @Column
    phone_number: string;
  
    @Column
    code: number;
  
}
