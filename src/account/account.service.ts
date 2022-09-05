import { HttpException, HttpStatus, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import Account from './entities/account.entity';
import * as bcrypt from 'bcrypt';
import { AccountTypeService } from 'src/account-type/account-type.service';
import { JwtGeneratorService } from 'src/jwt/jwt.service';
import { MailBoxService } from 'src/mail-box/mail-box.service';

@Injectable()
export class AccountService {

  constructor(
    @Inject('ACCOUNT_REPOSITORY')
    private readonly accountModel : typeof Account,
    private readonly jwtService: JwtGeneratorService,
    private readonly accountTypeService : AccountTypeService,
    private readonly mailboxService : MailBoxService
  ){}

  // create account of customers
  async createCustomerAccount({email,password},user_id) {
    
    try{
      let hashedPassword = await this.passwordHasing(password);
      
      const account_type="customer";
      const account_type_id = await this.accountTypeService.create({name:account_type})
      // account type 2 is when normal user create
      return await this.accountModel.create({email,password:hashedPassword,user_id,account_type_id}) 
    }
    catch(err){
      throw new InternalServerErrorException(err.parent.sqlMessage);
    }

  }
  

  // create account of customers
  async createNopCustomerAccount({email,password,user_id}) {
    
    try{
      let hashedPassword = await this.passwordHasing(password);
      const account_type="nop_commerce_user";
      const account_type_id = await this.accountTypeService.create({name:account_type})
      const user = await this.accountModel.findOne({where:{email}})
      if(user){
        return true;
      }else{
        console.log(user,"{email,password,user_id}")
        await this.mailboxService.credential(email,password)
        return await this.accountModel.create({email,password:hashedPassword,user_id,account_type_id})
      }

    }
    catch(err){
      throw new InternalServerErrorException(err.parent.sqlMessage);
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

  // check if account already exist
  async verifyAccount({email}){

    try{
      return await this.accountModel.findOne({where:{email}})
    }
    catch(err){
      return new InternalServerErrorException(err)
    }

  }

  // login
  async validateUser({email,password}){
    try{
      const account = await this.accountModel.findOne({where:{email}})
      if(!account) throw new HttpException("Email may be not exist",HttpStatus.UNAUTHORIZED);
      const isMatch = await bcrypt.compare(password, account.password);
      if(!isMatch) throw new HttpException("Invaild Password",HttpStatus.UNAUTHORIZED);
      return account.user_id;
    }
    catch(err){
      delete err.response;
      delete err.status;
      throw new HttpException(err,HttpStatus.UNAUTHORIZED);
    }
  }

  async login(id){
    try{
      const payload = {userId:id}
      return {
        access_token:await this.jwtService.generate_token(payload),
        user_id:id
      }
    }
    catch(err){
      delete err.response;
      delete err.status;
      throw new HttpException(err,HttpStatus.UNAUTHORIZED);
    }
  }

  async isUserExistEmail(email){
    try{
      return await this.accountModel.findOne({where:{email}})
    }
    catch(err){
      throw new InternalServerErrorException(err)
    }
  }

  async updatePassword({email,password},res){
    try{
      const user  = await this.isUserExistEmail(email);
      if(user){

        const hashedPassword = await this.passwordHasing(password);
        
        await this.accountModel.update({password:hashedPassword},{where:{email}});
        return res.status(200).json({message:"Password has been changed successfully",status:200});

      }else{
        return res.status(400).json({message:"user not exist",status:400})
      }
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

}
