import { Module } from '@nestjs/common';
import { ProvinceService } from './province.service';
import { provinceProvider } from './entities/province.provider';

@Module({
  providers: [ProvinceService,...provinceProvider],
  exports:[ProvinceService]
})
export class ProvinceModule {}
