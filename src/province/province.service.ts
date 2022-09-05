import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';
import Province from './entities/province.entity';

@Injectable()
export class ProvinceService {
  
  constructor(
    @Inject('PROVINCE_REPOSITORY')
    private readonly provinceModel : typeof Province

  ){}
  
  async create({province}) {
    try{
      const {id} = await this.provinceModel.create({name:province})
      return id;
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

  findAll() {
    return `This action returns all province`;
  }

  findOne(id: number) {
    return `This action returns a #${id} province`;
  }

  async update(id: number, {province}) {
    try{
      return await this.provinceModel.update({name:province},{where:{id}})
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} province`;
  }
}
