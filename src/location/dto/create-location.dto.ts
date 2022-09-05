import { ApiProperty } from "@nestjs/swagger";

export class CreateLocationDto {
    
    @ApiProperty()
    company_id:number

    @ApiProperty()
    title:string
    
    @ApiProperty()
    code:string
}
