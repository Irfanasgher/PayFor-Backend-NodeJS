import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CityService } from 'src/city/city.service';
import { CountryService } from 'src/country/country.service';
import { ProvinceService } from 'src/province/province.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import Address from './entities/address.entity';
import ShippingAddress from './entities/shippingAddress.entity';

@Injectable()
export class AddressService {

  constructor(
    @Inject('ADDRESS_REPOSITORY')
    private readonly addressModel : typeof Address,
    @Inject('SHIPPING_ADDRESS_REPOSITORY')
    private readonly shippingAddressModel : typeof ShippingAddress,
    private readonly city :  CityService,
    private readonly country : CountryService,
    private readonly province : ProvinceService
  ){}

  async create(addressDetail,user_id) {
    try{

      // create city
      const city_id = await this.city.create(addressDetail);
      // create country
      const country_id =await this.country.create(addressDetail);
      // create province
      const province_id =await this.province.create(addressDetail);
      
      // address
      const address = {
        user_id,
        address:addressDetail.address,
        postal_code:addressDetail.postal_code,
        city_id,
        country_id,
        province_id
      }


      return await this.addressModel.create(address)
    
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

  async createNop(addressDetail,user_id) {
    try{

      // address
      const address = {
        user_id,
        address:addressDetail.address,
        postal_code:addressDetail.postal_code,
        city:addressDetail.city,
        country:addressDetail.country,
        province:addressDetail.state
      }


      return await this.shippingAddressModel.create(address)
    
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

  async updateAddressFromUser(addressDetail,user_id){
    try{
      const {city_id,province_id,country_id} = await this.findOne(user_id);
      console.log(city_id,province_id,country_id)
      await this.updateMainAddress(addressDetail,user_id);
      await this.city.update(city_id,addressDetail);
      await this.province.update(province_id,addressDetail);
      await this.country.update(country_id,addressDetail);
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

  async updateMainAddress({address,postal_code},user_id){
    try{
      return await this.addressModel.update({address,postal_code},{where:{user_id}})
    }
    catch(Err){
      throw new InternalServerErrorException(Err);
    }
  }

  async findOne(id: number) {
    try{
      return await this.addressModel.findOne({where:{user_id : id}})
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }


  
  findAll() {
    return `This action returns all address`;
  }


  update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
