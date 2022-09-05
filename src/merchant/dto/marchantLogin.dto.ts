import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class MarchantLoginDto{

    @ApiProperty()
    @IsEmail()
    email:string

    @ApiProperty()
    @IsNotEmpty()
    password:string


}