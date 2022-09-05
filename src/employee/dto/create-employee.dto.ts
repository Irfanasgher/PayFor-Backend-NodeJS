import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateEmployeeDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name:string
    

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    email:string    

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    phone_number:string

    @ApiProperty()
    @IsNotEmpty()
    merchant_id:number

    @ApiProperty()
    @IsNotEmpty()
    company_id:number
    

}
