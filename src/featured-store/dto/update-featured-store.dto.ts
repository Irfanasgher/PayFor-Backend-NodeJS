import { PartialType } from '@nestjs/swagger';
import { CreateFeaturedStoreDto } from './create-featured-store.dto';

export class UpdateFeaturedStoreDto extends PartialType(CreateFeaturedStoreDto) {}
