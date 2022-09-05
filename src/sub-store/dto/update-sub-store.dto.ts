import { PartialType } from '@nestjs/swagger';
import { CreateSubStoreDto } from './create-sub-store.dto';

export class UpdateSubStoreDto extends PartialType(CreateSubStoreDto) {}
