import { HttpException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Exception } from 'handlebars';
import { Sequelize } from 'sequelize-typescript';
import { BankService } from 'src/bank/bank.service';
import Bank from 'src/bank/entities/bank.entity';
import Employee from 'src/employee/entities/employee.entity';
import InstallmentPayout from 'src/installment-payout/entities/installment-payout.entity';
import ItemDetail from 'src/item-details/entities/item-detail.entity';
import Location from 'src/location/entities/location.entity';
import Merchant from 'src/merchant/entities/merchant.entity';
import { MerchantService } from 'src/merchant/merchant.service';
import OrderDetail from 'src/order-detail/entities/order-detail.entity';
import Store from 'src/store/entities/store.entity';
import { StoreService } from 'src/store/store.service';
import User from 'src/user/entities/user.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import Company from './entities/company.entity';

@Injectable()
export class CompanyService {
  
  constructor(
    @Inject("COMPANY_REPOSITORY")
    private readonly companyModel : typeof Company,
    private readonly merchantService : MerchantService,
    private readonly bankService : BankService,
    private readonly storeService : StoreService,
  ){}
  
  async create(createCompanyDto: CreateCompanyDto,logo:string,bank_statement:string,res) {
    try{
      const {id} = await this.newCompany(createCompanyDto,logo);
      const store = {
        company_id: id,
        store_category_id:null,
        store_sub_category_id:null,
        name:createCompanyDto.company_name,
        logo,
        cover_image_url:null,
        url:createCompanyDto.website
      }
      await this.merchantService.create(id,createCompanyDto);
      await this.bankService.create(id,createCompanyDto,bank_statement)
      await this.storeService.create(store,res)
      return res.status(200).json({message:"company registered successfully",status:200});
    }
    catch(err){
      res.status(400).json({message:err,status:400})
    }
  }

  async newCompany({company_name,registration_number,expected_sale,website,company_email,company_address,required_for},logo){
    try{
      return await this.companyModel.create({company_name,registration_number,expected_sale,website,company_email,address:company_address,required_for,logo,is_active:0})
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

  async findCompanyByEmail({company_email},res){
    try{
      const company = await this.companyModel.findOne({where:{company_email}});
      if(company){
        throw res.status(400).json({message:"company already exist",status:400});
      }
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

  async findAll(res) {
    try{
      const company = await this.companyModel.findAll({
        include:[
          {model:Merchant,attributes:['contact_name']},
          {
            model:Store,
            
          }
        ]        
      });

      // company.map((cop)=>{

      // })

      return res.status(200).json({company,status:200});
    }
    catch(err){
      return res.status(400).json({message:err,status:400})
    }
  }

  async getStoreIdFromCompany(id){
    
      const company = await this.companyModel.findOne({include:[
      
        {model:Store}

      ],where:{id}});
      if(company){
        return company?.store[0]?.id
      }
  }

  async findOne(id: number,res) {
    
    try{
      const company = await this.companyModel.findOne({include:[
        {model:Bank}, 
        {model:Merchant,attributes:{exclude:['password']} , include:[
          {model:Employee}
        ]},

        {model:Store,include:[{model:OrderDetail,include:[{model:InstallmentPayout},{model:ItemDetail},{model:User}]}]}

      ],where:{id}});
      return res.status(200).json({company,status:200});
    }
    catch(err){
      return res.status(400).json({message:err,status:400})
    }

  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    try{
      return await this.companyModel.update(updateCompanyDto,{where:{id}})
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

  async remove(id: number) {
    return `This action removes a #${id} company`;
  }

  async getAllClientNumber(res){
    try{
      const clientNumber = await this.companyModel.count();
      return res.status(200).json({clientNumber,status:200});
      // return;
    }
    catch(err){
      return res.status(400).json({message:err,})
    }
  }
  
}
