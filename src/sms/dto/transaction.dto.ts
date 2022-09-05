import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPhoneNumber } from "class-validator";


export class TransactionDto{
    
    @ApiProperty()
    @IsPhoneNumber()   
    phone_number:string
    
    @ApiProperty()
    @IsNumber()
    order_id:number
}