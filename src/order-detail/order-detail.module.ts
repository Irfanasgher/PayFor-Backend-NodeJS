import { Module } from '@nestjs/common';
import { OrderDetailService } from './order-detail.service';
import { OrderDetailController } from './order-detail.controller';
import { StoreModule } from 'src/store/store.module';
import { ItemDetailsModule } from 'src/item-details/item-details.module';
import { orderDetailProvider } from './entities/order-detail.provider';
import { UserModule } from 'src/user/user.module';
import { AddressModule } from 'src/address/address.module';
import { AccountModule } from 'src/account/account.module';
import { OrderInstallmentPlanModule } from 'src/order-installment-plan/order-installment-plan.module';
import { CheckoutCardModule } from 'src/checkout-card/checkout-card.module';
import { MailBoxModule } from 'src/mail-box/mail-box.module';
import { companyProvider } from 'src/company/entities/company.provider';

@Module({
  imports:[StoreModule,ItemDetailsModule,UserModule,AddressModule,AccountModule,OrderInstallmentPlanModule,CheckoutCardModule,MailBoxModule],
  controllers: [OrderDetailController],
  providers: [OrderDetailService,...orderDetailProvider,...companyProvider],
  exports:[OrderDetailService]
})
export class OrderDetailModule {}
