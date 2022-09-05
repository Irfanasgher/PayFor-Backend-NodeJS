import { PartialType } from '@nestjs/swagger';
import { CreateInstoreLinkDto } from './create-instore-link.dto';

export class UpdateInstoreLinkDto extends PartialType(CreateInstoreLinkDto) {}
