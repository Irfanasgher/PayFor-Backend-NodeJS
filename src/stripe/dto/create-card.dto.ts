import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty } from "class-validator";

export class CreateCard {
    
    @ApiProperty()
    @IsNotEmpty()
    user_id:number

    @ApiProperty()
    @IsNotEmpty()
    stripe_customer_id:string
    
    @ApiProperty()
    @IsNotEmpty()
    card_number:string
    
    @ApiProperty()
    @IsNotEmpty()
    exp_month:number
    
    @ApiProperty()
    @IsNotEmpty()
    exp_year:number
    
    @ApiProperty()
    @IsNotEmpty()
    cvc:string

    @ApiProperty({default:false,description:'this field refers to the default card behavious only one card will be default'})
    @IsNotEmpty()
    @IsBoolean()
    is_default :boolean


}