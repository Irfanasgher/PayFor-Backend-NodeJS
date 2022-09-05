import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { StripeUserCardModule } from 'src/stripe-user-card/stripe-user-card.module';

@Module({
  imports : [StripeUserCardModule],
  controllers: [StripeController],
  providers: [StripeService],
  exports:[StripeService]
})
export class StripeUserModule {}
