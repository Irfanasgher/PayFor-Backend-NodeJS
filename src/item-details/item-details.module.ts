import { Module } from '@nestjs/common';
import { ItemDetailsService } from './item-details.service';
import { ItemDetailsController } from './item-details.controller';
import { itemDetailProvider } from './entities/item-detail.provider';

@Module({
  controllers: [ItemDetailsController],
  providers: [ItemDetailsService,...itemDetailProvider],
  exports : [ItemDetailsService]
})
export class ItemDetailsModule {}
