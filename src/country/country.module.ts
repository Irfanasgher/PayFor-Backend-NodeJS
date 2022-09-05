import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { countryProvider } from './entities/country.provider';

@Module({
  providers: [CountryService,...countryProvider],
  exports:[CountryService]
})
export class CountryModule {}
