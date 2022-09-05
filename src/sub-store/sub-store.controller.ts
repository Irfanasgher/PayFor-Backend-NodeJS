import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubStoreService } from './sub-store.service';
import { CreateSubStoreDto } from './dto/create-sub-store.dto';
import { UpdateSubStoreDto } from './dto/update-sub-store.dto';

@Controller('sub-store')
export class SubStoreController {
  constructor(private readonly subStoreService: SubStoreService) {}

  @Post()
  create(@Body() createSubStoreDto: CreateSubStoreDto) {
    return this.subStoreService.create(createSubStoreDto);
  }

  @Get()
  findAll() {
    return this.subStoreService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subStoreService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubStoreDto: UpdateSubStoreDto) {
    return this.subStoreService.update(+id, updateSubStoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subStoreService.remove(+id);
  }
}
