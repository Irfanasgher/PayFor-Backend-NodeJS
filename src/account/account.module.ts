import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { accountProvider } from './entities/account.provider';
import { AccountTypeModule } from 'src/account-type/account-type.module';
import { JwtGeneratorModule } from 'src/jwt/jwt.module';
import { MailBoxModule } from 'src/mail-box/mail-box.module';



@Module({
  imports:[    
    AccountTypeModule,
    JwtGeneratorModule,
    MailBoxModule
  ],
  controllers: [AccountController],
  providers: [AccountService,...accountProvider],
  exports:[AccountService]
})
export class AccountModule {}
