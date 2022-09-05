import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateTopStoreDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    store_id:number
}
