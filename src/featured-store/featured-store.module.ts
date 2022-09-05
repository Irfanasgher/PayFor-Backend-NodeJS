import { Module } from '@nestjs/common';
import { FeaturedStoreService } from './featured-store.service';
import { FeaturedStoreController } from './featured-store.controller';
import { featureStoreProvider } from './entities/featured-store.provider';

@Module({
  controllers: [FeaturedStoreController],
  providers: [FeaturedStoreService,...featureStoreProvider],
  exports:[FeaturedStoreService]
})
export class FeaturedStoreModule {}
