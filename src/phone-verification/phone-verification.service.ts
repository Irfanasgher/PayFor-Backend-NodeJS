import {  HttpStatus, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { TwilioSmsService } from 'src/twilio-sms/twilio-sms.service';
import User from 'src/user/entities/user.entity';
import { CreatePhoneVerificationDto } from './dto/create-phone-verification.dto';
import PhoneVerification from './entities/phone-verification.entity';
import axios from 'axios';
import Otp from './entities/otp.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { MailBoxService } from 'src/mail-box/mail-box.service';

@Injectable()
export class PhoneVerificationService {

  constructor(
    @Inject('PHONE_VERIFICATION_REPOSITORY')
    private readonly phoneVerificationModel : typeof PhoneVerification,
    private readonly twilioService : TwilioSmsService,
    private readonly accountService : AccountService,    
    @Inject('USER_REPOSITORY')
    private readonly userModel : typeof User,
    @Inject('OTP_REPOSITORY')
    private readonly otpModel : typeof Otp,
    private readonly mailservice:MailBoxService
  ){}
  
  async sentCode({phone_number},res,phone_number_verified){
    try{
      const code = Math.floor(Math.random() * (9999 - 1000)) + 1000;
      const msg = `Your PayFor OTP is ${code}. PayFor will never ask you for this code.`;
      await axios.get(`https://opencodes.pk/api/medver.php/sendsms/url?id=cd1209payfor&pass=payfor9348&mask=PayFor&to=${phone_number.replace("+","")}&lang=English&msg=${msg}`)
      .then(async (resp)=>{
        
        // check if code already exist then delete that
        await this.otpModel.destroy({where:{phone_number}});
        
        // create a cardinality 
        await this.otpModel.create({phone_number,code});
        console.log(phone_number.replace("+",""),code,'phone_number.replace("+","")')

        res.status(200).json({message:"otp sent successfully",status:200,phone_number_verified});

      }).catch((err)=> {
        console.log(phone_number.replace("+",""),code,'phone_number.replace("+","")errrr')
        res.status(400).json({message:"Bad request",status:400,phone_number_verified})
      })

    }
    catch(err){
      throw new InternalServerErrorException(err);
    }      
  }

  async verifyCodeTwilio({phone_number,code},res){
    try{
      // depricating the twillio api

      // const verify = await this.twilioService.verifySms(phone_number,code,res);

      // implementing opencode api 
      const verify = await this.otpModel.findOne({where:{phone_number,code}});
      if(verify){
        await this.otpModel.destroy({where:{phone_number,code}});
        await this.setPhoneVerification(phone_number,1)
        return res.status(200).json({message:"Phone_number verified",status:200});
      }else{
        return res.status(400).json({message:"Otp is invaild",status:400});
      }
    }catch(err){
      throw new InternalServerErrorException(err);
    }
  }

  async verify(phone_number,code,res){
    try{
      
      const verify = await this.otpModel.findOne({where:{phone_number,code}});
      if(verify){
        await this.otpModel.destroy({where:{phone_number,code}});
        await this.setPhoneVerification(phone_number,1)
        return true;
      }else{
        return false
      }
      
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

  async setPhoneVerification(phone_number,is_verified){
    try{
      return await this.phoneVerificationModel.findOrCreate({where:{phone_number,is_verified}});
    }
    catch(err){
      throw new InternalServerErrorException(err)
    }
  }

  async isPhoneExist({phone_number},res):Promise<any>{
    try{
      // phone_number = "+"+phone_number;
      const is_data_exist = await this.phoneVerificationModel.findOne({where:{phone_number}});
      console.log(is_data_exist,"is_data_exist");
      if(!is_data_exist) return res.status(400).json({message:"phone number is not registered",status:400});
      return true;
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }

  }

  async verifyLoginOnPhone(phone_number:string,res){
    try{
     const user = await this.userModel.findOne({where:{phone_number}})
     if(!user) return res.status(HttpStatus.FORBIDDEN).json({message:"please register yourself first",status:HttpStatus.NOT_FOUND});
     var data = await this.accountService.login(user.id);
     res.status(200).json({mesage:"user logged in successfully",data,status:200})
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  } 


 
  async isPhoneNumberUnverified(phone_number:string){
    try{
      return await this.phoneVerificationModel.findOne({where:{phone_number}})
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

  async IsPhoneVerified(phone_number:string){
    
    try{
      return await this.phoneVerificationModel.findOne({where:{phone_number,is_verified:1}})
    }
    catch(err){
      throw new InternalServerErrorException(err)
    }

  }


  
  async verifyUserEmail(email,res){
    try{
      const code = Math.floor(Math.random() * (9999 - 1000)) + 1000;
      await this.mailservice.verifyemail(email,code);
      await this.otpModel.destroy({where:{phone_number:email}});
        
        // create a cardinality 
      await this.otpModel.create({phone_number:email,code});
      res.status(200).json({message:'OTP sent successfully'});
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }
  

}
