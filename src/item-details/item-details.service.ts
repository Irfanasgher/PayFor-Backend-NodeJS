import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import sequelize from 'sequelize';
import { CreateItemDetailDto } from './dto/create-item-detail.dto';
import { UpdateItemDetailDto } from './dto/update-item-detail.dto';
import ItemDetail from './entities/item-detail.entity';

@Injectable()
export class ItemDetailsService {

  constructor(
    @Inject("ITEM_DETAIL_REPOSITORY")
    private readonly itemModel : typeof ItemDetail
  ){}

  async createItemNop(order_id,store_id,{item_name,item_description,item_price,item_image_url,item_size}) {
    try{
      return await this.itemModel.create({order_id,store_id,item_name,item_description,item_price,item_image_url,item_size})
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

  //  on approval refunded will be 1

  async refundRequest(id,res){
    try{
      const refund = await this.itemModel.update({is_refunded:1},{where:{id}})
      return res.status(200).json({message:'Refund requested',status:200});
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }


  //  on approval refunded will be 2
  async refundRequestApproved(id,res){
    try{
      const refund = await this.itemModel.update({is_refunded:2},{where:{id}})
      return res.status(200).json({message:'Refund requested',status:200});
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

  async refundNumber(){
    try{
      const refundednumber = await this.itemModel.findAll({where:{is_refunded:1}});
      return {refundednumber:refundednumber.length};
    }
    catch(err){

    }
  }

  async refundNumberByStore(store_id){
    try{
      const refundednumber = await this.itemModel.findAll({where:{is_refunded:1,store_id}});
      return {refundednumber:refundednumber.length};
    }
    catch(err){

    }
  }
  
  async refundGraph(store_id){
    
    try{
      const refund = await this.itemModel.findAll({
        group:[ sequelize.fn('MONTH', sequelize.col('createdAt'))],
        attributes: ['createdAt', [sequelize.fn('COUNT', 'createdAt'), 'TagCount']],        
        where:{is_refunded:1,store_id}});
      return refund;
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

}
