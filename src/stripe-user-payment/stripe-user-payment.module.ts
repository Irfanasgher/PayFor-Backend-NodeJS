import { Module } from '@nestjs/common';
import { StripeUserPaymentService } from './stripe-user-payment.service';
import { StripeUserPaymentController } from './stripe-user-payment.controller';

@Module({
  // controllers: [StripeUserPaymentController],
  providers: [StripeUserPaymentService]
})
export class StripeUserPaymentModule {}
