import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InstoreLinkService } from './instore-link.service';
import { CreateInstoreLinkDto } from './dto/create-instore-link.dto';
import { UpdateInstoreLinkDto } from './dto/update-instore-link.dto';

@Controller('instore-link')
export class InstoreLinkController {
  constructor(private readonly instoreLinkService: InstoreLinkService) {}

  @Post()
  create(@Body() createInstoreLinkDto: CreateInstoreLinkDto) {
    return this.instoreLinkService.create(createInstoreLinkDto);
  }

  @Get()
  findAll() {
    return this.instoreLinkService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.instoreLinkService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInstoreLinkDto: UpdateInstoreLinkDto) {
    return this.instoreLinkService.update(+id, updateInstoreLinkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.instoreLinkService.remove(+id);
  }
}
