import { Module } from '@nestjs/common';
import { InstoreLinkService } from './instore-link.service';
import { InstoreLinkController } from './instore-link.controller';
import { instoreLinkProvider } from './entities/instore-link.provider';
import { instoreInstallmentProvider } from './entities/instore-installment.provider';
import { SmsModule } from 'src/sms/sms.module';

@Module({
  imports:[SmsModule],
  controllers: [InstoreLinkController],
  providers: [InstoreLinkService,...instoreLinkProvider,...instoreInstallmentProvider]
})
export class InstoreLinkModule {}
