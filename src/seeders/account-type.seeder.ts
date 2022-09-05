import { Seeder, OnSeederInit } from 'nestjs-sequelize-seeder';
import AccountType from 'src/account-type/entities/account-type.entity';
 
@Seeder({
   model: AccountType,
   unique:['name']
})
export class SeedAccountType implements OnSeederInit {
   run() {
      const data = [
         {
            name: 'admin'
         },
         {
            name: 'customer',
         },
         {
            name: 'nop customer',
         },
         {
            name: 'buyzilla customer',
         },
         {
            name: 'other',
         },
      ];
      return data;
   }
 
}