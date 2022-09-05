import { ApiProperty } from "@nestjs/swagger";

export class FileUploadDto {
    @ApiProperty()
    prefix:string
}