import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdatePaymentStatus{
    
    @ApiProperty()
    installment_id:number

    @ApiProperty()
    @IsNotEmpty()
    status:string
}