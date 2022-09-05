import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common'
import OrderDetail from 'src/order-detail/entities/order-detail.entity';
import InstallmentPayout from './entities/installment-payout.entity';
const moment = require("moment");
import {Op} from 'sequelize';

@Injectable()
export class InstallmentPayoutService {

  constructor(
    
    @Inject('INSTALLMENT_PAYOUT_REPOSITORY')
    private readonly installmentPayoutModel : typeof InstallmentPayout ,



  ){}

  async createFakeArray(length:number){
    let arr = []
    for(let i =0;i<length;i++){
      arr.push(i);
    }
    return arr;
  }

  async createNopInstallmentBreakOut(user_id,order_id,installment_amount,total_price,installment_number,shipping_charges,assurance_amount){
    try{
  
      const installmentBreakOut = this.createFakeArray(installment_number)

      
      let is_paid=0;
      let paid_at=null;
      var amount=0;

      const installmentPayout = await Promise.all((await installmentBreakOut).map(async(fakeIteration,index)=>{
        
        
        if(index==0){
          let due_date=new Date();
          is_paid=0;
          paid_at= null;
          // first time the installment is the sum of installment amount + shipment + assurance amount
          const breakOut = {
            user_id,order_id,installment_amount:installment_amount+shipping_charges+assurance_amount,is_paid,due_date,paid_at,surcharge:0,remaining_amount:(total_price-(installment_amount*(index+1)))
          }
          amount = installment_amount+shipping_charges+assurance_amount;
          const {id} = await this.installmentPayoutModel.create(breakOut);
          return id;
        }else{
          
          
          let due_date=moment().add(25*index, 'days').calendar();
          const breakOut = {
            user_id,order_id,installment_amount,is_paid:0,due_date,paid_at:null,surcharge:0,remaining_amount:(total_price-(installment_amount*(index+1)))
          }
  
          const {id} = await this.installmentPayoutModel.create(breakOut)
          return id;
        }


      }));
      console.log(installmentPayout,"installmentPayoutinstallmentPayout")
      return {installment_payout_id:installmentPayout[0],amount}

    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

  async payInstallmentForNop(id: number) {

    try{
      const installment = await this.verifyInstallmentById(id);
      if(installment){

        await this.installmentPayoutModel.update({is_paid:1,paid_at:new Date()},{where:{id}});
        return installment
      }
      
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }

  }

  async verifyInstallmentById(id){
    try{
      return await this.installmentPayoutModel.findOne({where:{id}}); 
    }
    catch(err){
      throw new InternalServerErrorException(err)
    }
  }




  // get all unpaid installment

  async getAllunPaidInstallment(){
    try{
      return await this.installmentPayoutModel.findAll({include:[{model:OrderDetail}],where:{is_paid:0,due_date:new Date().toISOString().slice(0, 10)}});
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

  // getAllunPaidTransactionFailedInstallment
  

  async getAllunPaidTransactionFailedInstallment(){
    try{
      return await this.installmentPayoutModel.findAll({include:[{model:OrderDetail}],
        where:{
          is_paid:0,due_date:{[Op.lt]:new Date().toISOString().slice(0, 10)}
        }
      
      });
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }



  // is installment paid

  async isInstallmentPaid(id){
    try{
      const isPaid = await this.installmentPayoutModel.findOne({where:{is_paid:1,id}});
      if(isPaid){
        return true;
      }
      else{
        return false;
      }
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

}
