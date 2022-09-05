import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class Payment3dSecureDto{

    @ApiProperty()
    @IsNotEmpty()
    user_id:number

    @ApiProperty()
    @IsNotEmpty()
    card_id:number

    @ApiProperty()
    @IsNotEmpty()
    order_id:number

    @ApiProperty()
    @IsNotEmpty()
    installment_id:number

    @ApiProperty()
    @IsNotEmpty()
    currency:string

    @ApiProperty()
    @IsNotEmpty()
    amount:number
}