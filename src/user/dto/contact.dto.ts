import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class Contact{
    @ApiProperty()
    @IsEmail()
    email:string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    subject:string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    message:string
}