import { Module } from '@nestjs/common';
import { AccountTypeService } from './account-type.service';
import { AccountTypeController } from './account-type.controller';
import { accountTypeProvider } from './entities/account-type.provider';

@Module({
  controllers: [AccountTypeController],
  providers: [AccountTypeService,...accountTypeProvider],
  exports:[AccountTypeService]
})
export class AccountTypeModule {}
