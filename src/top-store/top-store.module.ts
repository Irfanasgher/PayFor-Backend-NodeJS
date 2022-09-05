import { Module } from '@nestjs/common';
import { TopStoreService } from './top-store.service';
import { TopStoreController } from './top-store.controller';
import { topStoreProvider } from './entities/top-store.provider';

@Module({
  controllers: [TopStoreController],
  providers: [TopStoreService,...topStoreProvider],
  exports:[TopStoreService]
})
export class TopStoreModule {}
