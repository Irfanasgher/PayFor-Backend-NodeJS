import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { CreateStripeDto } from './dto/create-stripe.dto';
import { UpdateStripeDto } from './dto/update-stripe.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateCard } from './dto/create-card.dto';
import { StripeUserCardService } from 'src/stripe-user-card/stripe-user-card.service';

@ApiTags("stripe")
@Controller('stripe')
export class StripeController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly stripeUserCard: StripeUserCardService
    ) {}

  @Post("createCustomer")
  create(@Body() createStripeDto: CreateStripeDto) {
    return this.stripeService.createCustomer(createStripeDto);
  }

  @Post("addCard")
  addCard(@Body() cardDetail: CreateCard) {
    return this.stripeService.createCard(cardDetail);
  }

  @Get("getCardsFromStripAdmin/:stripe_customer_id")
  getCard(@Param("stripe_customer_id") stripe_customer_id:string) {
    return this.stripeService.getCard(stripe_customer_id);
  }

  @Get("getCards/:user_id")
  getCardFromDb(@Param("user_id") user_id:number) {
    return this.stripeUserCard.getCardFromDb(user_id);
  }


  // @Post("setDefaultCard")
  // setDefaultCard(@Post())

  @Delete('deleteCard/:customerId/:cardId')
  remove(@Param('customerId') customerId: string, @Param('cardId') cardId: string,) {
    return this.stripeService.deleteCard(customerId,cardId);
  }


}
