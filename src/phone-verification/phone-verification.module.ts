import { forwardRef, Module } from '@nestjs/common';
import { PhoneVerificationService } from './phone-verification.service';
import { PhoneVerificationController } from './phone-verification.controller';
import { phoneVerificationProviders } from './entities/phone-verification.provider';
import { TwilioSmsModule } from 'src/twilio-sms/twilio-sms.module';
import { UserModule } from 'src/user/user.module';
import { userProviders } from 'src/user/entities/user.provider';
import { AccountModule } from 'src/account/account.module';
import { otpProvider } from './entities/otp.provider';
import { MailBoxModule } from 'src/mail-box/mail-box.module';

@Module({
  imports:[TwilioSmsModule,AccountModule,UserModule,MailBoxModule],
  controllers: [PhoneVerificationController,],
  providers: [PhoneVerificationService,...phoneVerificationProviders,...userProviders,...otpProvider],
  exports:[PhoneVerificationService]
})
export class PhoneVerificationModule {}
