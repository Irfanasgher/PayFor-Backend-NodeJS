import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { addressProvider } from './entities/address.provider';
import { CountryModule } from 'src/country/country.module';
import { CityModule } from 'src/city/city.module';
import { ProvinceModule } from 'src/province/province.module';
import { shippingAddressProvider } from './entities/shippingAddress.provider';

@Module({
  imports:[CountryModule,CityModule,ProvinceModule],
  // controllers: [AddressController],
  providers: [AddressService,...addressProvider,...shippingAddressProvider],
  exports:[AddressService]
})
export class AddressModule {}
