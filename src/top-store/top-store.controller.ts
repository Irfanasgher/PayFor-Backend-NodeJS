import { Controller, Get, Post, Body, Patch, Param, Delete,Res } from '@nestjs/common';
import { TopStoreService } from './top-store.service';
import { CreateTopStoreDto } from './dto/create-top-store.dto';
import { UpdateTopStoreDto } from './dto/update-top-store.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags("Top-store")
@Controller('top-store')
export class TopStoreController {
  constructor(private readonly topStoreService: TopStoreService) {}

  @Post()
  create(@Body() createTopStoreDto: CreateTopStoreDto,@Res() res:Response) {
    return this.topStoreService.create(createTopStoreDto,res);
  }

  @Get()
  findAll() {
    return this.topStoreService.getAllTopStores();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.topStoreService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTopStoreDto: UpdateTopStoreDto) {
    return this.topStoreService.update(+id, updateTopStoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.topStoreService.remove(+id);
  }
}
