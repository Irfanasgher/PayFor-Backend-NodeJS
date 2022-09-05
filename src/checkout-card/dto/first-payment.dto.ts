import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumberString } from "class-validator";

export class FirstPaymentDto {

    

    @ApiProperty()
    @IsNotEmpty()
    token:string
    

    

}
