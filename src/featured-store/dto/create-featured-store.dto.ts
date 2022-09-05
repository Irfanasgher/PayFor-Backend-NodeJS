import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateFeaturedStoreDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    store_id:number
}
