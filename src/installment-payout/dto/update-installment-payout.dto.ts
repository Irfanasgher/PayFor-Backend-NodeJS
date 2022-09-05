import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UpdateInstallmentPayoutDto {

    @ApiProperty()
    @IsNotEmpty()
    user_id:number

    @ApiProperty()
    @IsNotEmpty()
    order_id:number
}
