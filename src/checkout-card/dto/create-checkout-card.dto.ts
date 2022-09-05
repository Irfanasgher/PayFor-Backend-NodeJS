import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumberString } from "class-validator";

export class CreateCheckoutCardDto {

    @ApiProperty()
    @IsNotEmpty()
    user_id:number

    @ApiProperty()
    @IsNotEmpty()
    card_number:string

    @ApiProperty()
    @IsNotEmpty()
    cvv:string

    @ApiProperty()
    @IsNotEmpty()
    expiry_month:string

    @ApiProperty()
    @IsNotEmpty()
    expiry_year:string

    @ApiProperty()
    @IsNotEmpty()
    card_holder_name:string

    @ApiProperty()
    @IsNotEmpty()
    @IsNumberString()
    isPrimary:string

    @ApiProperty()
    @IsNotEmpty()
    @IsNumberString()
    isForPayment:string

    

}
