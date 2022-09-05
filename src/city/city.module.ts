import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { cityProvider } from './entities/city.provider';

@Module({
  providers: [CityService,...cityProvider],
  exports:[CityService]
})
export class CityModule {}
