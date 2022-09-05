import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { MarchantLoginDto } from './dto/marchantLogin.dto';

@ApiTags("Merchant")
@Controller('merchant')
export class MerchantController {
  constructor(private readonly merchantService: MerchantService) {}

  @Post("login")
  merchantLogin(@Body() marchantLogindto: MarchantLoginDto , @Res() res:Response)
  {
    return this.merchantService.marchantLogin(marchantLogindto,res)
  }
  
}
