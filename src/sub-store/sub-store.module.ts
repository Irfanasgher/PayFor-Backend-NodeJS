import { Module } from '@nestjs/common';
import { SubStoreService } from './sub-store.service';
import { SubStoreController } from './sub-store.controller';

@Module({
  controllers: [SubStoreController],
  providers: [SubStoreService]
})
export class SubStoreModule {}
