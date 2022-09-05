import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Res } from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags("store-detail")
@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  create(@Body() createStoreDto: CreateStoreDto,@Res() res:Response) {
    return this.storeService.create(createStoreDto,res);
  }

  

  @Get("getAllStores")
  allStores(@Res({passthrough:true}) res:Response) {
    return this.storeService.allStores(res);
  }

  @Get("instore")
  instore(@Res({passthrough:true}) res:Response) {
    return this.storeService.findInstore();
  }

  @Get("online")
  onlineStore(@Res({passthrough:true}) res:Response) {
    return this.storeService.findOnlineStore();
  }

  @Get("adminSideStore")
  findAll() {
    // return this.storeService.findAll();
    throw new HttpException("Access forbiden",HttpStatus.UNAUTHORIZED);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storeService.update(+id, updateStoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storeService.remove(+id);
  }
}
