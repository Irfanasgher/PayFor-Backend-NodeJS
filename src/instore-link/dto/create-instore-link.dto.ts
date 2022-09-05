import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPhoneNumber } from "class-validator";

export class CreateInstoreLinkDto {

    @ApiProperty()
    @IsNotEmpty()
    name:string

    @ApiProperty()
    @IsNotEmpty()
    @IsPhoneNumber()
    phone_number:string

    @ApiProperty()
    @IsNotEmpty()
    invoice_no:string

    @ApiProperty()
    @IsNotEmpty()
    total_amount:number

    @ApiProperty()
    @IsNotEmpty()
    payment_type:string

    @ApiProperty()
    @IsNotEmpty()
    store_name:string

    @ApiProperty()
    @IsNotEmpty()
    store_id:number

}
