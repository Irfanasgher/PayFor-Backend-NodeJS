import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("employee")
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto,@Res({passthrough:true}) res:Response) {
    return this.employeeService.create(createEmployeeDto,res);
  }

  @Get("getByMerchantId/:merchant_id")
  findAll(@Param('merchant_id') merchant_id:number , @Res({passthrough:true}) res:Response) {
    return this.employeeService.findAll(merchant_id,res);
  }

  @Get("admin/getallemployee")
  allemployee() {
    return this.employeeService.allemployee();
  }

  @Get(':id')
  findOne(@Param('id') id: string,@Res({passthrough:true}) res:Response) {
    return this.employeeService.findOne(+id,res);
  }

  @Patch('updateEmployeeLocation/:location_id')
  updateLocationOfEmployee(@Param('location_id') location_id: string, @Body() updateEmployeeDto: [],@Res({passthrough:true}) res:Response) {
    return this.employeeService.updateLocation(+location_id, updateEmployeeDto,res);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto,@Res({passthrough:true}) res:Response) {
    return this.employeeService.update(+id, updateEmployeeDto,res);
  }

  @Delete(':id')
  remove(@Param('id') id: string,@Res({passthrough:true}) res:Response) {
    return this.employeeService.remove(+id,res);
  }

  @Get('/getpassword/:asdf')
  getPassword(@Res({passthrough:true}) res:Response) {
    return this.employeeService.passwordHasing('2015-Zbc-2022');
  }
}
