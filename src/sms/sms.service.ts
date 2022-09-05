import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateSmDto } from './dto/create-sm.dto';
import { UpdateSmDto } from './dto/update-sm.dto';
import axios from 'axios';
import { OrderDetailService } from 'src/order-detail/order-detail.service';

@Injectable()
export class SmsService {

  constructor(
    private readonly orderDetailservice : OrderDetailService
  ){}

  async orderdispatched({phone_number,order_id,amount}){
    try{
      const orderDetail = await this.orderDetailservice.findOne(order_id);
      const msg=`Thank you for using PayFor . Your order # 00${order_id}  with ${(await orderDetail).store.name} is confirmed and your first installment of Rs ${amount} is received`
      await this.smsLocalService(phone_number,msg)
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }



  
  async smsLocalService(phone_number,msg){
    try{
      const data=`id=cd1209payfor&pass=payfor9348&msg=${msg}&to=${phone_number.replace("+","")}&lang=English&mask=PayFor`
      await axios.post(`http://www.opencodes.pk/api/medver.php/sendsms/url`,data)
      .then(async (resp)=>{console.log(resp)})
      .catch(err=>console.log(err));
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

  async smsInternationalServiceMain(phone_number,msg){
    try{
      
      // payforpk

      // eocean786

      const data=`id=payforpk&pass=eocean786&msg=${msg}&to=${phone_number.replace("+","")}&lang=English&mask=PayFor`
      await axios.post(`http://www.opencodes.pk/api/medver.php/sendsms/url`,data)
      .then(async (resp)=>{console.log(resp)})
      .catch(err=>console.log(err));
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }




  async transactionFailed({phone_number,order_id}){
    try{
      const msg=`Unfortunately, we're unable to charge your payment for order # 00${order_id}  to PayFor. Please check your email we have sent you a link to make the payment`
      return await this.smsLocalService(phone_number,msg);
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }


  async instorePaymentURL(name,url,phone,invoice,store){
    console.log(url,phone)
    const msg=`Dear ${name} Welcome on Payfor. You have placed an order ${invoice} on ${store} store. Please visit this link to make the payment ${url}`

    await this.smsLocalService(phone,msg)
    return "SMS send successfully"

  }

}
