import { PartialType } from '@nestjs/mapped-types';
import { CreateItemDetailDto } from './create-item-detail.dto';

export class UpdateItemDetailDto extends PartialType(CreateItemDetailDto) {}
