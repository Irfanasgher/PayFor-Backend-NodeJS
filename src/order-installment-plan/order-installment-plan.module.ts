import { Module } from '@nestjs/common';
import { OrderInstallmentPlanService } from './order-installment-plan.service';
import { orderInstallmentProvider } from './entities/order-installment-plan.provider';
import { InstallmentPayoutModule } from 'src/installment-payout/installment-payout.module';
import { checkOutCardProvider } from 'src/checkout-card/entities/checkout-card.provider';

@Module({
  imports:[InstallmentPayoutModule],
  // controllers: [OrderInstallmentPlanController],
  providers: [OrderInstallmentPlanService,...orderInstallmentProvider,...checkOutCardProvider],
  exports:[OrderInstallmentPlanService]
})
export class OrderInstallmentPlanModule {}
