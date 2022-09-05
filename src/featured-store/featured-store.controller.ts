import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { FeaturedStoreService } from './featured-store.service';
import { CreateFeaturedStoreDto } from './dto/create-featured-store.dto';
import { UpdateFeaturedStoreDto } from './dto/update-featured-store.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags("Featured-store")
@Controller('featured-store')
export class FeaturedStoreController {
  constructor(private readonly featuredStoreService: FeaturedStoreService) {}

  @Post()
  create(@Body() createFeaturedStoreDto: CreateFeaturedStoreDto,@Res() res:Response) {
    return this.featuredStoreService.create(createFeaturedStoreDto,res);
  }

  @Get()
  findAll() {
    return this.featuredStoreService.getAllFeaturedStore();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.featuredStoreService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeaturedStoreDto: UpdateFeaturedStoreDto) {
    return this.featuredStoreService.update(+id, updateFeaturedStoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.featuredStoreService.remove(+id);
  }
}
