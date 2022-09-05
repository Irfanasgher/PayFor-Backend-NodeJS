import { HttpException, HttpStatus, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import Store from 'src/store/entities/store.entity';
import { CreateFeaturedStoreDto } from './dto/create-featured-store.dto';
import { UpdateFeaturedStoreDto } from './dto/update-featured-store.dto';
import FeaturedStore from './entities/featured-store.entity';

@Injectable()
export class FeaturedStoreService {

  constructor(
    @Inject("FEATURE_STORE_REPOSITORY")
    private readonly featuredStoreModel : typeof FeaturedStore
  ){}


  async create(createFeaturedStoreDto: CreateFeaturedStoreDto,res) {
    try{
      await this.featuredStoreModel.create(createFeaturedStoreDto)
      return res.status(200).json({message:"Store added to featured store",status:200});
    }
    catch(err){
      return res.status(400).json({message:err});
    }
  }

  async getAllFeaturedStore() {
    try{
      const data = await this.featuredStoreModel.findAll({
        attributes:{exclude:['id','store_id','createdAt','updatedAt']},
        include:{
          model:Store,
          attributes:{exclude:['createdAt','updatedAt','user_id']}
        }
      })

      const featuredStore = data.map((store)=>store.store);
      const featuredStoreType =featuredStore.map((store)=>{
        const {id,name,logo,cover_image_url,url,store_category_id,store_sub_category_id}=store;
        var newStore =  {id,name,logo,cover_image_url,url,store_category_id,store_sub_category_id, type:'featuredStore'}
        return newStore
      });
      return featuredStoreType;
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

  async findOne(id: number) {
    try{
      return await this.featuredStoreModel.findOne({where:{id}})
    } 
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

  async update(id: number, updateFeaturedStoreDto: UpdateFeaturedStoreDto) {
    try{
      return await this.featuredStoreModel.update(updateFeaturedStoreDto,{where:{id}})
    } 
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

  async remove(id: number) {
    
    try{
      await this.featuredStoreModel.destroy({where:{id}})
      return new HttpException("Store is removed from featured store",HttpStatus.OK);
    } 
    catch(err){
      throw new InternalServerErrorException(err);
    }

  }
}
