import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { SmsService } from 'src/sms/sms.service';
import { CreateInstoreLinkDto } from './dto/create-instore-link.dto';
import { UpdateInstoreLinkDto } from './dto/update-instore-link.dto';
import InstoreInstallment from './entities/instore-installments.entity';
import InstoreLink from './entities/instore-link.entity';
const moment = require("moment");


@Injectable()
export class InstoreLinkService {

  constructor(

    @Inject('INSTORE_LINK_REPOSITORY')
    private readonly instoreLinkModel : typeof InstoreLink,
    @Inject('INSTORE_INSTALLMENT_REPOSITORY')
    private readonly instoreInstallmentModel : typeof InstoreInstallment,
    private readonly smsService : SmsService


  ){}


  async create(createInstoreLinkDto: CreateInstoreLinkDto) {
    try{
      const instoreLink = await this.instoreLinkModel.create(createInstoreLinkDto)
      const data = await this.createInstallment(instoreLink.id,instoreLink.total_amount);
      const url = `http://payfor-front.azurewebsites.net/instore/${instoreLink?.id}/${data[0]}/${instoreLink.total_amount/2}`;

      await this.smsService.instorePaymentURL(createInstoreLinkDto.name,url,createInstoreLinkDto.phone_number,createInstoreLinkDto.invoice_no,createInstoreLinkDto.store_name);
      return {message:"Link has been sent successfully",status:200}
    }catch(err){
      throw new InternalServerErrorException(err);
    }
  }

  async createInstallment(order_id,amount){
    try{
        let fakeArr = [1,2];

        const data = await Promise.all(fakeArr.map(async(size,index)=>{
          if(index==0){
            let due_date = new Date();
            const {id} = await this.instoreInstallmentModel.create({order_id,installment_amount:amount/2,due_date});
            return id;
          }else{
            let due_date = moment().add(35, 'days').calendar();
            const {id} = await this.instoreInstallmentModel.create({order_id,installment_amount:amount/2,due_date});
            return id;
          }
        }));
        return data;
    } 
    
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

  findAll() {
    return `This action returns all instoreLink`;
  }

  findOne(id: number) {
    return `This action returns a #${id} instoreLink`;
  }

  update(id: number, updateInstoreLinkDto: UpdateInstoreLinkDto) {
    return `This action updates a #${id} instoreLink`;
  }

  remove(id: number) {
    return `This action removes a #${id} instoreLink`;
  }

}
