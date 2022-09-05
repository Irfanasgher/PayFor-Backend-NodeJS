import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class UpdatePasswordDto{
    
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email:string


    @ApiProperty()
    @IsNotEmpty()
    password:string

}