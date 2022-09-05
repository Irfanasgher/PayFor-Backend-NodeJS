import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import Merchant from './entities/merchant.entity';
import * as bcrypt from 'bcrypt';
import { MailBoxService } from 'src/mail-box/mail-box.service';
import { JwtGeneratorService } from 'src/jwt/jwt.service';
import Company from 'src/company/entities/company.entity';
import Store from 'src/store/entities/store.entity';
import sequelize from 'sequelize';

@Injectable()
export class MerchantService {
  constructor(
    @Inject('MERCHANT_REPOSITORY')
    private readonly merchantModel : typeof Merchant,
    private readonly mailboxService : MailBoxService,
    private readonly jwtService : JwtGeneratorService,
    
  ){}
  async create(company_id,{contact_name,phone_number,merchant_email,merchant_address}) {
    try{
       
      var password = Math.floor(Math.random() * (999999 - 100000)) + 100000;
      // const hasedpassword = await this.passwordHasing(password);
      // await this.mailboxService.merchantEmail(merchant_email,password);
      return await this.merchantModel.create({company_id,contact_name,phone_number,email:merchant_email,address:merchant_address,password});
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

  // hashing of password
  async passwordHasing(password){

    try{
      const saltOrRounds = 1;
      const hash = await bcrypt.hash(password, saltOrRounds);
      return hash;
    }
    catch(err){
      return new InternalServerErrorException(err)
    }

  }

  async marchantLogin({email,password},res){
    try{
      

        const merchant = await this.merchantModel.findOne({include:[{model:Company,include:[Store]}] ,where:{email,password}});
        console.log(merchant);
        if(merchant){

          const payload = {merchant_id:merchant.id}
          console.log(merchant,await this.jwtService.generate_token(payload))
          return res.status(200).json({
            merchant_email:merchant.email,merchant_id:merchant.id,company_id:merchant.company_id,name:merchant.contact_name,role:merchant.role,store_id:merchant?.company?.store,
            access_token:await this.jwtService.generate_token(payload),
            
          })

        }
        else{
          return res.status(500).json({message:'Your email or password may be wrong',status:500});
        }
  
    }
    catch(Err){
      return res.status(400).json({message:Err,status:400});
    }
  }


  
  
  async merhcantClientGraph(){
    
    try{
      const client = await this.merchantModel.findAll({
        group:[ sequelize.fn('MONTH', sequelize.col('createdAt'))],
        attributes: ['createdAt', [sequelize.fn('COUNT', 'createdAt'), 'TagCount']],        
      });
      return client;
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

}
