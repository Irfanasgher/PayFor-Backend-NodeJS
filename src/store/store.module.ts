import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { storeProvider } from './entities/store.provider';
import { storeCategoryProvider } from './entities/store_category.provider';
import { storeSubCategoryProvider } from './entities/store_sub_category.provider';
import { FeaturedStoreModule } from 'src/featured-store/featured-store.module';
import { TopStoreModule } from 'src/top-store/top-store.module';
import { SeederModule } from 'nestjs-sequelize-seeder';
import {SeedStoreCategory} from '../seeders/store-category.seeder';
import {SeedStoreSubCategory} from '../seeders/store-sub-category.seeder';
@Module({
  imports : [
    // SeederModule.forFeature([SeedStoreCategory,SeedStoreSubCategory]),
    FeaturedStoreModule,TopStoreModule
  ],
  controllers: [StoreController],
  providers: [StoreService,...storeProvider,...storeCategoryProvider,...storeSubCategoryProvider],
  exports:[StoreService]

})
export class StoreModule {}
