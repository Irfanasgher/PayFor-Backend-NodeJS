import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags("location")
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  create(@Body() createLocationDto: CreateLocationDto,@Res() res:Response) {
    return this.locationService.create(createLocationDto,res);
  }

  @Get("getByCompanyId/:company_id")
  findAll(@Param("company_id") company_id:number, @Res({passthrough:true}) res:Response) {
    return this.locationService.findAll(company_id,res);
  }

  @Get(':id')
  findOne(@Param('id') id: string,@Res() res:Response) {
    return this.locationService.findOne(+id,res);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLocationDto: UpdateLocationDto,@Res() res:Response) {
    return this.locationService.update(+id, updateLocationDto,res);
  }

  @Delete(':id')
  remove(@Param('id') id: string,@Res() res:Response) {
    return this.locationService.remove(+id,res);
  }
}
