import { Seeder, OnSeederInit } from 'nestjs-sequelize-seeder';
import StoreSubCategory from 'src/store/entities/store_sub_category.entity';
 
@Seeder({
   model: StoreSubCategory,
   unique:['name']
})
export class SeedStoreSubCategory implements OnSeederInit {
   run() {
      const data = [
         {
            name: 'designer'
         },
         {
            name: 'brand',
         },
      ];
      return data;
   }
 
}