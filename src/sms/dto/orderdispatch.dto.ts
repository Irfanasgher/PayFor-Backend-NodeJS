import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPhoneNumber } from "class-validator";

export class OrderDispatchSmsDto {
    
    @ApiProperty()
    @IsPhoneNumber()
    phone_number:string

    @ApiProperty()
    @IsNumber()
    order_id:number

    @ApiProperty()
    @IsNotEmpty()
    amount:number

}
