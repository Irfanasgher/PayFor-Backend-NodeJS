import { HttpException, HttpStatus, Inject, Injectable, InternalServerErrorException, Res } from '@nestjs/common';
import Account from 'src/account/entities/account.entity';
import { FeaturedStoreService } from 'src/featured-store/featured-store.service';
import OrderDetail from 'src/order-detail/entities/order-detail.entity';
import { TopStoreService } from 'src/top-store/top-store.service';
import User from 'src/user/entities/user.entity';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import Store from './entities/store.entity';
import StoreCategory from './entities/store_category.entity';
import StoreSubCategory from './entities/store_sub_category.entity';

@Injectable()
export class StoreService {

  constructor(
    @Inject('STORE_RESPOSITORY')
    private readonly storeModel : typeof Store,
    @Inject('STORE_CATEGORY_REPOSITORY')
    private readonly storeCategoryModel : typeof StoreCategory,
    private readonly featuredStoreService : FeaturedStoreService,
    private readonly topStoreService : TopStoreService
  ){}

  async create(storeInfo: CreateStoreDto,res) {
    try{
      const is_store_exist = await this.storeModel.findOne({where:{company_id:storeInfo.company_id,name:storeInfo.name}});
      if(is_store_exist) res.status(HttpStatus.CONFLICT).json({message:"this store is already exist",status:400});
      await this.storeModel.create(storeInfo);
      return res.status(200).json({message:"store registred successfully",status:200});
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }


  

  async createStoreForNop(store_name,store_url) {
    try{
      const is_store_exist = await this.storeModel.findOne({where:{url:store_url}});
      if(is_store_exist) return {store_id:is_store_exist.id};
      const store_category_id = await this.createStoreCategory("nop commerce");
      const {id} = await this.storeModel.create({name:store_name,url:store_url,store_category_id});
      
      return {store_id:id};
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

  async createStoreCategory(store_category_name){
    try{
      const category_is_Exist = await this.storeCategoryModel.findOne({where:{store_category_name}});
      if(category_is_Exist){
        return category_is_Exist.id;
      }else{
        const {id} = await this.storeCategoryModel.create({store_category_name});
        return id;
      }
    }catch(err){
      throw new InternalServerErrorException(err);
    }
  }
  

  async findAll() {
    try{
      return await this.storeModel.findAll({
        include:[{model:StoreCategory,attributes:['store_category_name']},{model:StoreSubCategory,attributes:['store_sub_category_name']}]
        ,attributes:{exclude:['createdAt','updatedAt']}
      });
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

  async newArrival() {
    try{
      const  arrival = await this.storeModel.findAll({
        attributes:{exclude:['createdAt','updatedAt','user_id','storeCategory','storeSubCategory']},

        limit:6
        // where:{store_category_id},
      });
      const data = arrival.map((item)=>{
        const {id,name,logo,cover_image_url,url,store_category_id,store_sub_category_id} =item;
        const newStore = {id,name,logo,cover_image_url,url,store_category_id,store_sub_category_id,type:'newArrival'};
        return newStore;
      })
      return data;
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }


  // this func collection all store category classified data structure
  async allStores(res){
    try{
      const {InStore} = await this.findInstore();
      const {onlineStore} = await this.findOnlineStore();
      const featuredStore = await this.featuredStoreService.getAllFeaturedStore();
      const topStore = await this.topStoreService.getAllTopStores();
      const newArrival = await this.newArrival()
      res.status(200).json({newArrival,featuredStore,topStore,InStore,onlineStore,status:200})
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

  async findInstore() {
    try{
      var stores = await this.storeModel.findAll({
        // include:[
        //   {model:StoreCategory,attributes:['store_category_name']},
        //   {model:StoreSubCategory,attributes:['store_sub_category_name']}
        // ],
        attributes:{
          exclude:['createdAt','updatedAt','user_id'],
        },
        where:{store_category_id :2},
      });
      
      let designers=[];
      let brands=[];

      stores.map((store)=>{
        const {id,name,logo,cover_image_url,url,store_category_id,store_sub_category_id}=store;
        if(store.store_sub_category_id===1){
          let newStore = {id,name,logo,cover_image_url,url,store_category_id,store_sub_category_id,type:'designer'}
          designers.push(newStore)
        }else{
          let newStore = {id,name,logo,cover_image_url,url,store_category_id,store_sub_category_id,type:'designer'}

          brands.push(newStore)
        }
      })

      return {InStore:{designers,brands}}
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

  async findOnlineStore() {
    try{
      var stores =  await this.storeModel.findAll({
        // include:[
        //   {model:StoreCategory,attributes:['store_category_name']},
        //   {model:StoreSubCategory,attributes:['store_sub_category_name']}
        // ],
        attributes:{
          exclude:['createdAt','updatedAt','user_id'],
        },
        where:{store_category_id :3},
      });

      let designers=[];
      let brands=[];

      stores.map((store)=>{
        const {id,name,logo,cover_image_url,url,store_category_id,store_sub_category_id}=store;
        if(store.store_sub_category_id===1){
          let newStore = {id,name,logo,cover_image_url,url,store_category_id,store_sub_category_id,type:'designer'}
          designers.push(newStore)
        }else{
          let newStore = {id,name,logo,cover_image_url,url,store_category_id,store_sub_category_id,type:'designer'}

          brands.push(newStore)
        }
      })

      return {onlineStore:{designers,brands}}

    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

  async findOne(id: number) {
    try{
      return await this.storeModel.findOne({where:{id},include:[{model:StoreCategory},{model:StoreSubCategory}]})
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

  async update(id: number, updateStoreDto: UpdateStoreDto) {
    try{
      return await this.storeModel.update(updateStoreDto,{where:{id}})
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

  async remove(id: number) {
    try{
      return await this.storeModel.destroy({where:{id}})
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

  async getAllCustomers(company_id){
    try{
      const store = await this.storeModel.findOne({where:{ company_id },include:[{model:OrderDetail,include:[{model:User,attributes:{exclude:['credit_limit','stripe_customer_id']},include:[{model:Account,attributes:{exclude:['password','createdAt','updatedAt','account_type_id']}}]}]}]});
      console.log(store,"ssssssss store")
      const customers =store.orderDetail.map((order)=>{
        return order.user;
      });
      return customers;
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

}
