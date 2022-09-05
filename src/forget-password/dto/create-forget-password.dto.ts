import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateForgetPasswordDto {
    
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email:string


}
