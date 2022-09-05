import { HttpStatus, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { MailBoxService } from 'src/mail-box/mail-box.service';
import ForgetPassword from './entities/forget-password.entity';

@Injectable()
export class ForgetPasswordService {

  constructor(
    @Inject("FORGET_PASSWORD_REPOSITORY")
    private readonly forgetPassword : typeof ForgetPassword,
    private readonly mailerService : MailBoxService,
    private readonly accountService : AccountService
  ){}


  async sendCode({email},res) {
    try{
      const is_user_exist = await this.accountService.isUserExistEmail(email);
      if(!is_user_exist) {return res.status(400).json({message:"Invalid email"});}
      const is_mail_sent = await this.forgetPassword.findOne({where:{email}})
      if(is_mail_sent) {await this.forgetPassword.destroy({where:{email}})}
      const code = Math.floor(Math.random() * 5555) + 1111;
      await this.mailerService.sendMail(email,code)
      const forget = await this.forgetPassword.create({email,code,is_verified:0});
      if(forget){
        return res.status(200).json({message:"Email sent successfully"});
      }
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }

  async verifyCode({email,code}) {
    try{
      const is_exist=await this.forgetPassword.findOne({where:{email,code}})
      if(!is_exist) throw new InternalServerErrorException("Code is invaild");
      await this.updateVerificationStatus(email)
      return true;
    }
    catch(err){
      throw new InternalServerErrorException(err)
    }
  }

  async updateVerificationStatus(email){
    try{
      return await this.forgetPassword.update({is_verified:1},{where:{email}});
    }
    catch(err){
      throw new InternalServerErrorException(err)
    }
  }

  async resendCode(email){
    
    try{

      const is_user_exist = await this.accountService.isUserExistEmail(email)
      if(!is_user_exist) return new InternalServerErrorException("Invalid email");
      const code = Math.floor(Math.random() * 5555) + 1111;
      await this.mailerService.sendMail(email,code)
      return HttpStatus.OK
    }
    catch(err){
      throw new InternalServerErrorException(err)
    }

  }

  async resendCodeUpdate(email,code){
    try{
      return await this.forgetPassword.update({code},{where:{email,is_verifid:0}});
    }
    catch(err){
      throw new InternalServerErrorException(err)
    }
  }


}
