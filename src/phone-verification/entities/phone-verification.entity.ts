import { Table, Column, Model } from 'sequelize-typescript';

@Table
export default class PhoneVerification extends Model{
    @Column
    phone_number: string;
  
    @Column
    code: number;
  
    @Column
    is_verified: boolean;
  
}
