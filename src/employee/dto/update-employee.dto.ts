import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNumber } from 'class-validator';
import { CreateEmployeeDto } from './create-employee.dto';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {
    @ApiProperty()
    @IsBoolean()
    is_active:boolean

    @ApiProperty()
    @IsNumber()
    location_id:number
}
