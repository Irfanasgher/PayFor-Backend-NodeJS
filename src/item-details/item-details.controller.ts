import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { ItemDetailsService } from './item-details.service';
import { CreateItemDetailDto } from './dto/create-item-detail.dto';
import { UpdateItemDetailDto } from './dto/update-item-detail.dto';
import { ApiTags } from '@nestjs/swagger';
import {Response} from 'express';
@ApiTags("item-detail")
@Controller('item-details')
export class ItemDetailsController {
  constructor(private readonly itemDetailsService: ItemDetailsService) {}

  @Get("admin/refundRequest/:item_id")
  refundRequest(@Param('item_id') item_id:number, @Res() res:Response){
    return this.itemDetailsService.refundRequest(item_id,res)
  }

  @Get("admin/refundRequestApproved/:item_id")
  refundRequestApproved(@Param('item_id') item_id:number, @Res() res:Response){
    return this.itemDetailsService.refundRequestApproved(item_id,res)
  }

  @Get("admin/getRefundNumber")
  refundNumber(){
    return this.itemDetailsService.refundNumber()
  }

  @Get("admin/getRefundNumberByMerchant/:store_id")
  getRefundNumberByMerchant(@Param("store_id") store_id:number){
    return this.itemDetailsService.refundNumberByStore(store_id)
  }

}
