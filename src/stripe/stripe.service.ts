import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectStripe } from 'nestjs-stripe';
import { StripeUserCardService } from 'src/stripe-user-card/stripe-user-card.service';
import Stripe from 'stripe';
import { CreateCard } from './dto/create-card.dto';
import { CreateStripeDto } from './dto/create-stripe.dto';
import { UpdateStripeDto } from './dto/update-stripe.dto';

@Injectable()
export class StripeService {

  constructor(
    @InjectStripe()
    private readonly stripeClient : Stripe,
    private readonly stripeUser : StripeUserCardService

  ){}

  async createCustomer({email,name}) {
    try{
      const {id} = await this.stripeClient.customers.create({
        email,name
      });
      // returns customer id
      return id;
    }
    catch(err){
      throw new InternalServerErrorException("stripe error while adding new customer");
    }
  }


// this function will verify the card
// and returns when corrospondings results

  async createPaymentMethod({card_number,exp_month,exp_year,cvc}){
    try{

      const paymentMethod = await this.stripeClient.paymentMethods.create({
        type: 'card',
        card: {
          number: card_number,
          exp_month,
          exp_year,
          cvc,
        },
      });
      return paymentMethod
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

  async createCard(createCard: CreateCard) {
    try{

      // create payment method 
      const {id} = await this.createPaymentMethod(createCard);

      // attach payment method to the customer
      await this.stripeClient.paymentMethods.attach(
        id,
        {customer: createCard.stripe_customer_id}
      );

      // add card to the crossponding customer
      const card = await this.stripeClient.customers.createSource(
        
        createCard.stripe_customer_id,
        {source:'tok_amex'}  

      )

      if(createCard.is_default){
        this.setDefaultCard(createCard.stripe_customer_id,card.id)
      }

      // add card in database
      await this.stripeUser.create(createCard,card.id);
      return new HttpException("Card is added successfully",HttpStatus.OK)
    }
    
    catch(err){
      throw new InternalServerErrorException(err);
    }

  }
  
  async getCard(customerId:string) {
    try{

      let customerRespone= await this.stripeClient.customers.retrieve(
        customerId
      );

      let cards=await this.stripeClient.customers.listSources(
        customerId,
        {object: 'card'}      
      )

      // let default_card_id=customerRespone ? customerRespone[0].default_source : null;

      return {default_card_id:Object.values(customerRespone)[6],cards}
      
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }  

  async setDefaultCard(customerId:string,cardId:string){
    try{
      const customer = await this.stripeClient.customers.update(
        customerId,
        {default_source:cardId}
      );
      return customer
    }
    catch(err){
      throw new InternalServerErrorException(err)
    }
  }

  async deleteCard(customerId:string,cardId:string){
    
    try{

      const deleted = await this.stripeClient.customers.deleteSource(
        customerId,
        cardId
        );
      await this.stripeUser.deleteCard(cardId)
      return new HttpException("Card deleted successfully",HttpStatus.OK);
    }
    
    catch(err){
      throw new InternalServerErrorException(err);
    }

  }



}
