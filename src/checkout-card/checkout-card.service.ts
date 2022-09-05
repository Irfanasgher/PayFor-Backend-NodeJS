import { forwardRef, Inject, Injectable, InternalServerErrorException, Res } from '@nestjs/common';
import { CreateCheckoutCardDto } from './dto/create-checkout-card.dto';
import { UpdateCheckoutCardDto } from './dto/update-checkout-card.dto';
import { cko } from '../constant';
import CheckoutCard from './entities/checkout-card.entity';
import { InstallmentPayoutService } from 'src/installment-payout/installment-payout.service';
import { OrderDetailService } from 'src/order-detail/order-detail.service';
import { UserService } from 'src/user/user.service';
import axios from 'axios';
import checkoutPaymentDetails from './entities/payment-detail.entity';



@Injectable()
export class CheckoutCardService {

  constructor(

    @Inject('CHECKOUT_CARD_REPOSITORY')
    private readonly checkoutModel : typeof CheckoutCard,
    @Inject('PAYMENT_DETAIL_REPOSITORY')
    private readonly checkoutpaymentModel : typeof checkoutPaymentDetails,
    
    private readonly installmentPayoutService : InstallmentPayoutService,
    @Inject(forwardRef(()=>OrderDetailService))
    private readonly orderDetail : OrderDetailService,
    private readonly userService : UserService,
  ){}



  async create(createCheckoutCardDto: CreateCheckoutCardDto,res,callingFrom) {
    try {
      // const verify = true
      // const verify = await this.verifyCard(createCheckoutCardDto,res,callingFrom)
      // console.log(verify,"verig")
      // if(verify){
  
        const data = await cko.tokens.request({ 
  
          type:'card',
          number:createCheckoutCardDto.card_number,
          cvv: createCheckoutCardDto.cvv,
          expiry_month: createCheckoutCardDto.expiry_month,
          expiry_year: createCheckoutCardDto.expiry_year,
          card_holder_name:createCheckoutCardDto.card_holder_name
        });

        console.log(data,"Ddddddddddd")
        const {customer_id,instrument_id} = await this.createCustomer(data["token"],createCheckoutCardDto.user_id)
        await this.addCard(createCheckoutCardDto,customer_id,instrument_id,res,callingFrom);


      // }

    } catch (err) {
      return res.status(400).json({message:err,status:400})
    }

  };


  async createCustomer(token,user_id){
    try{
      const {first_name,last_name,phone_number,account} = await this.userService.getSingleUser(user_id);
      // console.log(account.email,"customer");

      try{

        const customerResponse = await cko.customers.get(account.email);
        const instrument_id = await this.createInstrument(token,customerResponse['id'])
        return {customer_id:customerResponse['id'],instrument_id};

      }catch(err){
        const response = await cko.customers.create({
            name: first_name + " " + last_name,
            email:account.email,
            phone: {
              country_code: '+92',
              number: phone_number,
            }
          });

          console.log(response,"asdasdasd")
          // its the customer created id
          const instrument_id= await this.createInstrument(token,response['id'])
          return {customer_id : response['id'],instrument_id}
      }
      
      
      
     
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }

  }


  async verifyCard(createCheckoutCardDto,res,callingFrom){
    try{
        const is_exist = await this.checkoutModel.findOne({where:{user_id:createCheckoutCardDto.user_id}});
        console.log(is_exist);
        if(is_exist){
          if(callingFrom==="nop") return
          res.status(400).json({message:'only one card is allowed to be add',status:400});
          return false;
          // await this.checkoutModel.update({is_primary:0},{where:{id:is_exist.id}})
          // return true;
        }else{
          return true
        }

    }
    catch(err){
      throw new InternalServerErrorException(err)
    }
  }

  
  async addCard(createCheckoutCardDto,token,instrument_id,res,callingFrom){
    try{

      const is_exist = await this.checkoutModel.findOne({where:{user_id:createCheckoutCardDto.user_id,is_primary:1}});
      if(is_exist){
        await this.checkoutModel.update({is_primary:0},{where:{id:is_exist.id}})
      }

      const card_detail = await this.CardType(createCheckoutCardDto.card_number);
     
      const checkout = await this.checkoutModel.create({
        user_id:createCheckoutCardDto.user_id,
        token,
        instrument_id,
        payment_id:"",
        card_holder_name:createCheckoutCardDto.card_holder_name,
        card_type:card_detail.type,
        card_scheme:card_detail.scheme,
        card_brand:card_detail.brand,
        lastDigit:createCheckoutCardDto.card_number.slice(12,16),
        is_primary:createCheckoutCardDto.isPrimary,
        isForPayment:createCheckoutCardDto.isForPayment
      });

      // it omit the res response when user created from nop commerece store directly
      if(callingFrom==="nop") return;

      return res.status(200).json({
        cards:checkout,
        message:'card added successfully',
        status:200
      })

    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

  async CardType(card_number: string) {
    try{
      console.log(card_number.slice(0,8))
      const card_detail = await axios.get("https://lookup.binlist.net/"+card_number.slice(0,8))
      return card_detail.data;
    } 
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

   // we create instrument for the generated token for the sake to use later

   async createInstrument(token,customer_id){
    try {
      const instrument = await cko.instruments.create({
        token,
        customer: {
          id:customer_id
        }
      });
      return instrument['id']
    } catch (err) {
      console.log(err.name);
    }
  }

  async payment3dSecure({user_id,card_id,currency,amount,order_id,installment_id},res){
    try {
      const data = await this.checkoutModel.findOne({where:{user_id,id:card_id,is_primary:1}});
      if(data){
        console.log(data.instrument_id,"data.instrument_iddata.instrument_id")
        try{

          const payment = await cko.payments.request({
            source: {
              id:data.instrument_id
            },
            "3ds":{
              enabled:true,
              attempt_n3d:true
            },
            currency,
            amount:amount*100,
            paymeny_type:"Recurring",
            reference: `order_id ${order_id}`,
            // success_url:'http://localhost:3000/success',
            // failure_url:'http://localhost:3000/fail'
            success_url:'https://payfor-front.azurewebsites.net/success',
            failure_url:'https://payfor-front.azurewebsites.net/fail'
          });
          
          console.log(payment,payment['id'])
          
          // adding transaction detail into payment detail table
          const payment_detail = {
            user_id,
            card_id,
            installment_id,
            order_id,
            payment_id:payment['id'],
            status:null
          }

          const is_payment = await this.checkoutpaymentModel.findOne({where:{installment_id}})
          if(!is_payment){
            await this.checkoutpaymentModel.create(payment_detail);
          }

          // adding payment_id in user card
          
          await this.orderDetail.updateorderPaymentId(payment['id'],order_id)

          return res.status(200).json({payment})

        }

        catch(err){
          console.log(err);
          res.status(400).json({message:"Transaction Failed"})
        }


      }
      else{
        res.status(400).json({message:"Please add atleast one card",status:400});
      }
    }
    catch(err){
      return res.status(400).json({message:err,status:400})
    }

  }


  // call this api on thank u page after the payment success
  async clearInstallments({installment_payout_id},res){
    try{
          const installment_id = installment_payout_id;
          // get paid installment detail 
          const installment_Detail = await this.installmentPayoutService.payInstallmentForNop(installment_id);
    
          if(installment_Detail.remaining_amount===0){
            await this.orderDetail.fullfillOrder(installment_Detail.order_id);
            res.status(200).json({message:"amount paid successfully",is_completed:1,status:200});
          }
    
          res.status(200).json({message:"amount paid successfully",is_completed:0,status:200});
    }catch(err){
        res.status(400).json({message:err,status:400});
    }
  }

  async getPaymentDetail(){
    try{
      const paymentDetail = await cko.payments.get('pay_aesr3cakweqklpljljuho3mjwe');
      console.log(paymentDetail,"paymentDetail")
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

  async getCard(user_id,res){
    try{
      
      const card = await this.checkoutModel.findOne({where:{user_id}});
     
      const instrument = await cko.instruments.get(card.instrument_id);
      
      let updateCard = {
        id:card.id,
        user_id:card.user_id,
        token:card.token,
        card_holder_name:card.card_holder_name,
        card_type:card.card_scheme,
        lastDigit:instrument['last4'],
        is_primary:card?.is_primary?"1":"0",isForPayment:card?.isForPayment?"1":"0",createdAt:card.createdAt,updatedAt:card.updatedAt
      }
      

      res.status(200).json({cards:card?updateCard:null,message:"card retrieve successfully",status:200});
    
    }
    catch(err){
      res.status(400).json({message:err,status:400})
    }
  }
  
  
  async deleteCard(cardId,res){
    try {
      
      const {token} = await this.checkoutModel.findOne({where:{id:cardId}});
      await this.checkoutModel.destroy({where:{id:cardId}})
      await cko.customers.delete(token);
      res.status(200).json({cards:null,message:"card has been deleted successfully",status:200});

    }catch(err) {
      throw new InternalServerErrorException(err);
    }
  }

  // update payment detail status
  // that will be true if payment done successfully and vice versa

  async updatePaymentDetailStatus({installment_id,status},res){
    try{
      const updatedStatus = await this.checkoutpaymentModel.update({status},{where:{installment_id}})
      res.status(200).json({message:"Payment detail updated",status:200})
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

  // test
  
  async payment({user_id,amount,currency,installment_id},res){
    try{
      const getCardDetail =await this.checkoutModel.findOne({where:{user_id,is_primary:1}})
      try{

          const payment = await cko.payments.request({
            source: {
            id:(await getCardDetail).instrument_id
          },
          currency,
          amount:amount,
          paymeny_type:'Recurring',
          success_url:'https://payfor-front.azurewebsites.net/success',
          failure_url:'https://payfor-front.azurewebsites.net/fail'
        });
        await this.newPaymentDetail(user_id,installment_id,payment['id'],"fullfilled")
        await this.clearInstallments({installment_payout_id:installment_id},res);
      }

      // update payment
      catch(err){
        await this.newPaymentDetail(user_id,installment_id,null,"failed")
      }


    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }


  // create new payment detail when payment successfull while cron job runing

  async newPaymentDetail(user_id,installment_id,payment_id,status){
    try{
      const payment_detail = {
        user_id,
        installment_id,
        payment_id,
        status
      }

      const is_payment = await this.checkoutpaymentModel.findOne({where:{installment_id}})
      if(is_payment){
        await this.checkoutpaymentModel.update({status},{where:{installment_id}})
      }else{
        await this.checkoutpaymentModel.create(payment_detail);
      }

    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

  

}