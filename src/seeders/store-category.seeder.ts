import { Seeder, OnSeederInit } from 'nestjs-sequelize-seeder';
import StoreCategory from 'src/store/entities/store_category.entity';
 
@Seeder({
   model: StoreCategory,
   unique:['name']
})
export class SeedStoreCategory implements OnSeederInit {
   run() {
      const data = [
         {
            name: 'online'
         },
         {
            name: 'instore',
         },
      ];
      return data;
   }
 
}