import { Module } from '@nestjs/common';
import { ForgetPasswordService } from './forget-password.service';
import { ForgetPasswordController } from './forget-password.controller';
import { forgetPasswordProvider } from './entities/forget-password.provider';
import { MailBoxModule } from 'src/mail-box/mail-box.module';
import { AccountModule } from 'src/account/account.module';

@Module({
  imports : [MailBoxModule,AccountModule],
  controllers: [ForgetPasswordController],
  providers: [ForgetPasswordService,...forgetPasswordProvider]
})
export class ForgetPasswordModule {}
