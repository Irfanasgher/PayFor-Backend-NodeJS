import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { FileUploadModule } from 'src/file-upload/file-upload.module';
import { companyProvider } from './entities/company.provider';
import { MerchantModule } from 'src/merchant/merchant.module';
import { BankModule } from 'src/bank/bank.module';
import { StoreModule } from 'src/store/store.module';

@Module({
  imports:[FileUploadModule,MerchantModule,BankModule,StoreModule],
  controllers: [CompanyController],
  providers: [CompanyService,...companyProvider]
})
export class CompanyModule {}
