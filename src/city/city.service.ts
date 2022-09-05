import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import City from './entities/city.entity';

@Injectable()
export class CityService {

  constructor(
    @Inject("CITY_REPOSITORY")
    private readonly cityModel : typeof City
  ){}

  async create({city}) {
    try{
      const {id} = await this.cityModel.create({name:city});
      return id;
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

  findAll() {
    return `This action returns all city`;
  }

  findOne(id: number) {
    return `This action returns a #${id} city`;
  }

  async update(id: number,{city}) {
    try{
      return await this.cityModel.update({name:city},{where:{id}});
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} city`;
  }
}
