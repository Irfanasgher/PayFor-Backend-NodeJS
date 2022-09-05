import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsMobilePhone, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email:string

    @ApiProperty()
    @IsNotEmpty()
    password:string

    @ApiProperty()
    @IsNotEmpty()
    @IsMobilePhone('en-PK')
    phone_number:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    first_name:string


    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    last_name:string

    @ApiProperty()
    @IsNotEmpty()
    address:string

    @ApiProperty()
    @IsNotEmpty()
    country:string

    @ApiProperty()
    @IsNotEmpty()
    province:string

    @ApiProperty()
    @IsNotEmpty()
    city:string
    
    @ApiProperty()
    @IsNotEmpty()
    postal_code:string

    @ApiProperty()
    @IsNotEmpty()
    dob:string

    @ApiProperty()
    @IsOptional()
    nic:string


    
}
