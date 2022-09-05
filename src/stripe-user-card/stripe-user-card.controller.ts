import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StripeUserCardService } from './stripe-user-card.service';
import { CreateStripeUserCardDto } from './dto/create-stripe-user-card.dto';
import { UpdateStripeUserCardDto } from './dto/update-stripe-user-card.dto';
import { ApiTags } from '@nestjs/swagger';

// @ApiTags("user-card-detail")
// @Controller('stripe-user-card')
// export class StripeUserCardController {
//   constructor(private readonly stripeUserCardService: StripeUserCardService) {}

//   @Post()
//   create(@Body() createStripeUserCardDto: CreateStripeUserCardDto) {
//     return this.stripeUserCardService.create(createStripeUserCardDto);
//   }

  

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.stripeUserCardService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateStripeUserCardDto: UpdateStripeUserCardDto) {
//     return this.stripeUserCardService.update(+id, updateStripeUserCardDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.stripeUserCardService.remove(+id);
//   }
// }
