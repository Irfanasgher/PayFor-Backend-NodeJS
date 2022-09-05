import { Module } from '@nestjs/common';
import { InstallmentPayoutService } from './installment-payout.service';
import { InstallmentPayoutController } from './installment-payout.controller';
import { installmentPayoutProvider } from './entities/installment-payout.provider';

@Module({
  controllers: [InstallmentPayoutController],
  providers: [InstallmentPayoutService,...installmentPayoutProvider],
  exports: [InstallmentPayoutService]
})
export class InstallmentPayoutModule {}
