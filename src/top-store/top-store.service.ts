import { HttpException, HttpStatus, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import Store from 'src/store/entities/store.entity';
import { CreateTopStoreDto } from './dto/create-top-store.dto';
import { UpdateTopStoreDto } from './dto/update-top-store.dto';
import TopStore from './entities/top-store.entity';

@Injectable()
export class TopStoreService {

  constructor(
    @Inject("TOP_STORE_REPOSITORY")
    private readonly topStoreModel :typeof TopStore
  ){}

  async create(createTopStoreDto: CreateTopStoreDto,res) {
    try{
      await this.topStoreModel.create(createTopStoreDto);
      return res.status(200).json({message:"Store added to top store successfully",status:200});
    }
    catch(err){
      res.status(400).json({message:err,status:400})
    }
  }

  async getAllTopStores() {
    try{
      const data = await this.topStoreModel.findAll({attributes:{exclude:['id','store_id','createdAt','updatedAt']},include:{model:Store,attributes:{exclude:['createdAt','updatedAt','user_id']}}})
      const topStore = data.map((store)=>store.store);
      const topStoreType = topStore.map((store)=>{
        const {id,name,logo,cover_image_url,url,store_category_id,store_sub_category_id}=store;
        const newStore = {id,name,logo,cover_image_url,url,store_category_id,store_sub_category_id,type:'TopStore'}
        return newStore
      })
      return topStoreType;
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

  async findOne(id: number) {
    try{
      return await this.topStoreModel.findOne({where:{id}})
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

  async update(id: number, updateTopStoreDto: UpdateTopStoreDto) {
    try{
      await this.topStoreModel.update(updateTopStoreDto,{where:{id}});
      return new HttpException("store updated successfully",HttpStatus.OK)
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

  async remove(id: number) {
    try{
      await this.topStoreModel.destroy({where:{id}});
      return new HttpException("store deleted from top store succesfully",HttpStatus.OK)
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }
}
