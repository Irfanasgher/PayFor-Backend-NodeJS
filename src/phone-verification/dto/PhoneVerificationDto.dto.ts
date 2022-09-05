import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from "class-validator";

export class PhoneVerificationDto{
    @ApiProperty()
    @IsNotEmpty()
    // @IsPhoneNumber()
    phone_number:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    code:string
}