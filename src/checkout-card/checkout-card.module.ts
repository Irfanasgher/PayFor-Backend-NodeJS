import { forwardRef, Module } from '@nestjs/common';
import { CheckoutCardService } from './checkout-card.service';
import { CheckoutCardController } from './checkout-card.controller';
import { checkOutCardProvider } from './entities/checkout-card.provider';
import { InstallmentPayoutModule } from 'src/installment-payout/installment-payout.module';
import { OrderDetailModule } from 'src/order-detail/order-detail.module';
import { UserModule } from 'src/user/user.module';
import { paymentDetailProvider } from './entities/payment-detail.provider';
import { MailBoxModule } from 'src/mail-box/mail-box.module';

@Module({
  imports : [InstallmentPayoutModule,forwardRef(()=>OrderDetailModule),UserModule,MailBoxModule],
  controllers: [CheckoutCardController],
  providers: [CheckoutCardService,...checkOutCardProvider,...paymentDetailProvider],
  exports:[CheckoutCardService]
})
export class CheckoutCardModule {}
