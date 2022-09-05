import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import Country from './entities/country.entity';

@Injectable()
export class CountryService {

  constructor(
    @Inject('COUNTRY_REPOSITORY')
    private readonly countryModel:typeof Country
  ){}

  async create({country}) {
    try{
      const {id} = await this.countryModel.create({name:country});
      return id
    } 
    catch(err){
      throw new InternalServerErrorException(err)
    }
  }

  findAll() {
    return `This action returns all country`;
  }

  findOne(id: number) {
    return `This action returns a #${id} country`;
  }

  async update(id: number, {country}) {    
    try{
      return await this.countryModel.update({name:country},{where:{id}});
      
    } 
    catch(err){
      throw new InternalServerErrorException(err)
    }
  }

  remove(id: number) {
    return `This action removes a #${id} country`;
  }
}
