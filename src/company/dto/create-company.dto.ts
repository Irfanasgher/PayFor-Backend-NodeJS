import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, isNotEmpty, IsNotEmpty, IsPhoneNumber, IsString, IsUrl } from "class-validator";

export class CreateCompanyDto {

    @ApiProperty()
    @IsNotEmpty()
    company_name:string

    @ApiProperty()
    @IsNotEmpty()
    registration_number:string

    @ApiProperty()
    @IsNotEmpty()
    expected_sale:number

    @ApiProperty()
    @IsNotEmpty()
    @IsUrl()
    website:string

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    company_email:string

    @ApiProperty()
    @IsNotEmpty()
    company_address:string

    @ApiProperty()
    @IsNotEmpty()
    required_for:string

    
    // @ApiProperty({
    //     type:'string',
    //     format:'binary'
    // })
    // logo:string

    @ApiProperty()
    @IsNotEmpty()
    contact_name:string

    @ApiProperty()
    @IsPhoneNumber()
    phone_number:string


    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    merchant_email:string

    @ApiProperty()
    @IsNotEmpty()
    merchant_address:string

    @ApiProperty()
    @IsNotEmpty()
    account_name:string

    @ApiProperty()
    @IsNotEmpty()
    account_number:string

    @ApiProperty()
    @IsNotEmpty()
    bank_name:string

    @ApiProperty()
    @IsNotEmpty()
    branch_code:string

    @ApiProperty()
    @IsNotEmpty()
    currency:string

    
    // @ApiProperty({
    //     type:'string',
    //     format:'binary'
    // })
    // bank_statement:string


    
}
