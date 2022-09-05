import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateStripeUserCardDto } from './dto/create-stripe-user-card.dto';
import { UpdateStripeUserCardDto } from './dto/update-stripe-user-card.dto';
import StripeUserCard from './entities/stripe-user-card.entity';

@Injectable()
export class StripeUserCardService {

  constructor(
    @Inject("STRIPE_USER_CARD_REPOSITORY")
    private readonly stripeUserModel : typeof StripeUserCard
  ){}

  async create({user_id,is_default},card_stripe_id) {
    try{
      return await this.stripeUserModel.create({user_id,card_stripe_id,is_default});
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

  async getCardFromDb(user_id){
    try{
      return await this.stripeUserModel.findAll({where:{user_id}})
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

  async deleteCard(card_stripe_id){
    try{
      return await this.stripeUserModel.destroy({where:{card_stripe_id}})
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }


}
