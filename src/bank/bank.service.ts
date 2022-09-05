import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';
import Bank from './entities/bank.entity';

@Injectable()
export class BankService {
  constructor(
    @Inject('BANK_REPOSITORY')
    private readonly bankModel:typeof Bank
  ){}
  async create(company_id,{bank_name,branch_code,account_name,account_number,currency},bank_statement) {
    try{
      const bank_detail = await this.findOne(company_id);
      if(bank_detail) return
      await this.bankModel.create({company_id,bank_name,branch_code,account_name,account_number,currency,bank_statement})
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

  async findAll() {
    try{
      return await this.bankModel.findAll();
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

  async findOne(id: number) {
    try{
      return await this.bankModel.findOne({where:{company_id:id}})
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

  async update(id: number, updateBankDto: UpdateBankDto) {
    try{
      return await this.bankModel.update(updateBankDto,{where:{id}})
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} bank`;
  }
  
}
