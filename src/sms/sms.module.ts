import { Module } from '@nestjs/common';
import { SmsService } from './sms.service';
import { SmsController } from './sms.controller';
import { OrderDetailModule } from 'src/order-detail/order-detail.module';

@Module({
  imports:[OrderDetailModule],
  controllers: [SmsController],
  providers: [SmsService],
  exports:[SmsService]
})
export class SmsModule {}
