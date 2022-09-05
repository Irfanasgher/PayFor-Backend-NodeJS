import { ApiProperty } from "@nestjs/swagger";

export class OrderConfirmationDto{
    @ApiProperty()
    order_id:number
    @ApiProperty()
    email:string
}