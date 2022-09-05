import { Module } from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { MerchantController } from './merchant.controller';
import { merchantProvider } from './entities/merchant.provider';
import { MailBoxModule } from 'src/mail-box/mail-box.module';
import { JwtGeneratorModule } from 'src/jwt/jwt.module';
import { storeProvider } from 'src/store/entities/store.provider';

@Module({
  imports:[MailBoxModule,JwtGeneratorModule],
  controllers: [MerchantController],
  providers: [MerchantService,...merchantProvider,...storeProvider],
  exports : [MerchantService]

})
export class MerchantModule {}
