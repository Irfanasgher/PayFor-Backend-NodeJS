import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsMobilePhone, IsNotEmpty } from "class-validator";

export class CreatePhoneVerificationDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsMobilePhone()
    phone_number:string

    @ApiProperty()
    @IsNotEmpty()
    is_signUp:string

}