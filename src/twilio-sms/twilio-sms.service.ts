import { BadGatewayException, HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectTwilio, TwilioClient } from 'nestjs-twilio';
import { twilio } from 'src/constant';
@Injectable()
export class TwilioSmsService {

  constructor(@InjectTwilio() private readonly client: TwilioClient) {}

    
  async sendSMS(phone_number:string,res,phone_number_verified) {
    try {
      await this.client.verify.services(twilio.serviceId)
      .verifications
      .create({to: phone_number, channel: 'sms'})
      .then(verification => console.log(verification.status));
      return res.status(200).json({message:"otp sent successfully",status:200,phone_number_verified})
    }catch (err) {
      throw new InternalServerErrorException(err)
    }
  }
  

  async verifySms(phone_number,code,res){
    try{
      const verification_check = await this.client.verify.services(twilio.serviceId)
      .verificationChecks
      .create({to: phone_number, code})

      if(verification_check.status==="pending"){
        return res.status(400).json({message:"code is not valid",status:400})
      }
      return true
    }
    catch(err){
      throw new BadGatewayException("code is not valid");
    }
  }


}
