import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderInstallmentPlanService } from './order-installment-plan.service';
import { CreateOrderInstallmentPlanDto } from './dto/create-order-installment-plan.dto';
import { UpdateOrderInstallmentPlanDto } from './dto/update-order-installment-plan.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("order-installment-plan")
@Controller('order-installment-plan')
export class OrderInstallmentPlanController {
  constructor(private readonly OrderInstallmentPlanService: OrderInstallmentPlanService) {}

  @Post()
  create(@Body() createOrderInstallmentPlanDto: CreateOrderInstallmentPlanDto) {
    return this.OrderInstallmentPlanService.create(createOrderInstallmentPlanDto);
  }

  @Get()
  findAll() {
    return this.OrderInstallmentPlanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.OrderInstallmentPlanService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderInstallmentPlanDto: UpdateOrderInstallmentPlanDto) {
    return this.OrderInstallmentPlanService.update(+id, updateOrderInstallmentPlanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.OrderInstallmentPlanService.remove(+id);
  }
}
