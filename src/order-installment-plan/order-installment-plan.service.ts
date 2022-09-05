import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import CheckoutCard from 'src/checkout-card/entities/checkout-card.entity';
import { InstallmentPayoutService } from 'src/installment-payout/installment-payout.service';
import { CreateOrderInstallmentPlanDto } from './dto/create-order-installment-plan.dto';
import { UpdateOrderInstallmentPlanDto } from './dto/update-order-installment-plan.dto';
import OrderInstallmentPlan from './entities/order-installment-plan.entity';

@Injectable()
export class OrderInstallmentPlanService {

  constructor(
    @Inject('ORDER_INSTALLMENT_PLAN')
    private readonly orderInstallmentPlan : typeof OrderInstallmentPlan,
    @Inject('CHECKOUT_CARD_REPOSITORY')
    private readonly checkoutModel : typeof CheckoutCard,
    private InstallmentsPayout : InstallmentPayoutService,
  ){}
  
  async installmentPlanNop(user_id,store_id,order_id,price,shipping_charges,assurance_amount){
    try{
      // const installment_number =3;
      // const installment_number = await this.checkisCreditCardOrDebit(user_id);
      const installment_number = 2 ;
      const installment_amount = (price/installment_number);
      const orderInstallmentPayout={
        store_id,order_id,installment_number,installment_amount,status:1
      }
      await this.orderInstallmentPlan.create(orderInstallmentPayout);
      return await this.InstallmentsPayout.createNopInstallmentBreakOut(user_id,order_id,installment_amount,price,installment_number,shipping_charges,assurance_amount)
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }


  

  // check wheather the user's enteried card is debit or credit to set the number of installments
  async checkisCreditCardOrDebit(user_id){
    try{
      const card = await this.checkoutModel.findOne({where:{user_id}});
      if(card?.card_type==="credit"){
        return 3;
      }
      else{
        return 3;
      }
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }
  


  create(createOrderInstallmentPlanDto: CreateOrderInstallmentPlanDto) {
    return 'This action adds a new OrderInstallmentPlan';
  }

  findAll() {
    return `This action returns all OrderInstallmentPlan`;
  }

  findOne(id: number) {
    return `This action returns a #${id} OrderInstallmentPlan`;
  }

  update(id: number, updateOrderInstallmentPlanDto: UpdateOrderInstallmentPlanDto) {
    return `This action updates a #${id} OrderInstallmentPlan`;
  }

  remove(id: number) {
    return `This action removes a #${id} OrderInstallmentPlan`;
  }
}
