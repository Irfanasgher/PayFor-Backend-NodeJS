import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateStripeUserCardDto {
    
    @ApiProperty()
    @IsNotEmpty()
    user_id:number

    @ApiProperty()
    @IsNotEmpty()
    card_stripe_id:string

    @ApiProperty({default:false})
    @IsNotEmpty()
    is_default:boolean


}
