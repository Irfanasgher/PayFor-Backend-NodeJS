import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userProviders } from './entities/user.provider';
import { PhoneVerificationModule } from 'src/phone-verification/phone-verification.module';
import { AddressModule } from 'src/address/address.module';
import { AccountModule } from 'src/account/account.module';
import { StripeUserModule } from 'src/stripe/stripe.module';
import { MailBoxModule } from 'src/mail-box/mail-box.module';
import { MerchantModule } from 'src/merchant/merchant.module';

@Module({
  imports:[forwardRef(() => PhoneVerificationModule),AddressModule,AccountModule,StripeUserModule,MailBoxModule,MerchantModule],
  controllers: [UserController],
  providers: [UserService,...userProviders],
  exports:[UserService]
})
export class UserModule {}
