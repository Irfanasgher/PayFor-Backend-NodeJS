import { Module } from '@nestjs/common';
import { CheckoutCardModule } from 'src/checkout-card/checkout-card.module';
import { InstallmentPayoutModule } from 'src/installment-payout/installment-payout.module';
import { CronJobService } from './cron-job.service';

@Module({
  imports: [InstallmentPayoutModule,CheckoutCardModule],
  providers: [CronJobService]
})
export class CronJobModule {}
