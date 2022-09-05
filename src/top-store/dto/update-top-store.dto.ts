import { PartialType } from '@nestjs/swagger';
import { CreateTopStoreDto } from './create-top-store.dto';

export class UpdateTopStoreDto extends PartialType(CreateTopStoreDto) {}
