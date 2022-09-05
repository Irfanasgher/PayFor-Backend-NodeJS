import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StripeUserPaymentService } from './stripe-user-payment.service';
import { CreateStripeUserPaymentDto } from './dto/create-stripe-user-payment.dto';
import { UpdateStripeUserPaymentDto } from './dto/update-stripe-user-payment.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("stripe-payments")
@Controller('stripe-user-payment')
export class StripeUserPaymentController {
  constructor(private readonly stripeUserPaymentService: StripeUserPaymentService) {}

  @Post()
  create(@Body() createStripeUserPaymentDto: CreateStripeUserPaymentDto) {
    return this.stripeUserPaymentService.create(createStripeUserPaymentDto);
  }

  @Get()
  findAll() {
    return this.stripeUserPaymentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stripeUserPaymentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStripeUserPaymentDto: UpdateStripeUserPaymentDto) {
    return this.stripeUserPaymentService.update(+id, updateStripeUserPaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stripeUserPaymentService.remove(+id);
  }
}
