import { ApiProperty } from "@nestjs/swagger";
import { isNotEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateStoreDto {
    

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    company_id:number

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    logo:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    cover_image_url:string
    
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    url:string

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    store_category_id:number

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    store_sub_category_id:number


}
