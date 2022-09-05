import { Module } from '@nestjs/common';
import { StripeUserCardService } from './stripe-user-card.service';
// import { StripeUserCardController } from './stripe-user-card.controller';
import { stripeUserCardProvider } from './entities/stripe-user-card.provider';

@Module({
  // controllers: [StripeUserCardController],
  providers: [StripeUserCardService,...stripeUserCardProvider],
  exports:[StripeUserCardService]
})
export class StripeUserCardModule {}
