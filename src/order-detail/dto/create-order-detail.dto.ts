import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsObject, IsString, IsUrl } from "class-validator";

export class CreateOrderDetailDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    store_name:string
    
    @ApiProperty()
    @IsNotEmpty()
    @IsUrl()
    store_url:string
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    order_id:string

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    order_price:string


    @ApiProperty({
        type: 'array',
        items:{
            type:'object',
        }
    })
    items_detail:[]


    @ApiProperty({
        type:'object'
    })
    @IsObject()
    user:{}

    @ApiProperty({
        type:'object'
    })
    @IsObject()
    address:{}


    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    shipping_charges: number

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    assurance_amount : number

    @ApiProperty()
    isoCurrency:string
   
}
