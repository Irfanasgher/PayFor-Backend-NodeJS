import { Module } from '@nestjs/common';
import { BankService } from './bank.service';
import { BankController } from './bank.controller';
import { bankProvider } from './entities/bank.provider';

@Module({
  controllers: [BankController],
  providers: [BankService,...bankProvider],
  exports : [BankService]
})
export class BankModule {}
