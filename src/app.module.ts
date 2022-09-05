import { Module } from '@nestjs/common';
import { PhoneVerificationModule } from './phone-verification/phone-verification.module';
import { UserModule } from './user/user.module';
import { AccountModule } from './account/account.module';
import { AccountTypeModule } from './account-type/account-type.module';
import { AddressModule } from './address/address.module';
import { CountryModule } from './country/country.module';
import { ProvinceModule } from './province/province.module';
import { CityModule } from './city/city.module';
import { WishListModule } from './wish-list/wish-list.module';
import { OrderDetailModule } from './order-detail/order-detail.module';
import { InstallmentPayoutModule } from './installment-payout/installment-payout.module';
import { StripeUserCardModule } from './stripe-user-card/stripe-user-card.module';
import { StripeUserPaymentModule } from './stripe-user-payment/stripe-user-payment.module';
import { StoreModule } from './store/store.module';
import { ItemCategoryModule } from './item-category/item-category.module';
import { ItemDetailsModule } from './item-details/item-details.module';
import { OrderInstallmentPlanModule } from './order-installment-plan/order-installment-plan.module';
import { DatabaseModule } from './database/database.module';
import { ForgetPasswordModule } from './forget-password/forget-password.module';
import { MailBoxModule } from './mail-box/mail-box.module';
import { FeaturedStoreModule } from './featured-store/featured-store.module';
import { TopStoreModule } from './top-store/top-store.module';
import { StripeUserModule } from './stripe/stripe.module';
import { StripeModule } from 'nestjs-stripe';
import { TwilioSmsModule } from './twilio-sms/twilio-sms.module';
import { SubStoreModule } from './sub-store/sub-store.module';
import { CheckoutCardModule } from './checkout-card/checkout-card.module';
import { MerchantModule } from './merchant/merchant.module';
import { CompanyModule } from './company/company.module';
import { BankModule } from './bank/bank.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { JwtGeneratorModule } from './jwt/jwt.module';
import { EmployeeModule } from './employee/employee.module';
import { LocationModule } from './location/location.module';
import { SmsModule } from './sms/sms.module';

// corn job
import { ScheduleModule } from '@nestjs/schedule';
import { CronJobModule } from './cron-job/cron-job.module';
import { InstoreLinkModule } from './instore-link/instore-link.module';


@Module({
  imports: [

    // stripe is just implemented for test purpose may be use in future just safe side not focused
    
    StripeModule.forRoot({
      apiKey:'sk_test_51JIqqMKqTWt5srhzLr6zVypfvTrhQzTUTuoAdbFrDPTsJR1bVe7iVaLBgCrwbWxSCQyW0MOoFD3oS1EalgL1AsrU00PB8X28QS',
      apiVersion:'2020-08-27',
    }),

    // corn job config
    ScheduleModule.forRoot(),
    // corn job config terminate
    PhoneVerificationModule, UserModule, AccountModule, AccountTypeModule, AddressModule, CountryModule, ProvinceModule, CityModule, WishListModule, OrderDetailModule, InstallmentPayoutModule, StripeUserCardModule, StripeUserPaymentModule, StoreModule, ItemCategoryModule, ItemDetailsModule, OrderInstallmentPlanModule, DatabaseModule, ForgetPasswordModule, MailBoxModule, FeaturedStoreModule, TopStoreModule, StripeUserModule, TwilioSmsModule, SubStoreModule, CheckoutCardModule, MerchantModule, CompanyModule, BankModule, FileUploadModule, JwtGeneratorModule, EmployeeModule, LocationModule, SmsModule, CronJobModule, InstoreLinkModule,
  ],
})
export class AppModule {}
