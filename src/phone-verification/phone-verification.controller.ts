import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException, Res } from '@nestjs/common';
import { PhoneVerificationService } from './phone-verification.service';
import { CreatePhoneVerificationDto } from './dto/create-phone-verification.dto';
import { UpdatePhoneVerificationDto } from './dto/update-phone-verification.dto';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PhoneVerificationDto } from './dto/PhoneVerificationDto.dto';
import { InjectTwilio, TwilioClient } from 'nestjs-twilio';
import { TwilioSmsService } from 'src/twilio-sms/twilio-sms.service';
import { Response } from 'express';
import { UserService } from 'src/user/user.service';


@ApiTags("phone-verification")
@Controller('phone-verification')
export class PhoneVerificationController {

  constructor(
    @InjectTwilio() 
    private  twilioService : TwilioSmsService,
    private  userService : UserService,
    private  phoneVerificationService: PhoneVerificationService

    ) {}

  @Post("getCode")

  async getCode(@Body() createPhoneVerificationDto: CreatePhoneVerificationDto,@Res() res:Response) {

    if(eval(createPhoneVerificationDto.is_signUp)===true){
      const is_user_exist = await this.userService.isUserAlreadyExist(createPhoneVerificationDto.phone_number);
      if(is_user_exist){
        return res.status(400).json({message:"phone number is already in use",status:400})
      }else{
        const IsPhoneVerified = await this.phoneVerificationService.IsPhoneVerified(createPhoneVerificationDto.phone_number);
        if(IsPhoneVerified){
          // response will be 1 when phone is verified in signup case to skip otp screen
          return res.status(200).json({message:"phone number is already verified",status:200,phone_number_verified:1})
        }else{
          // response will be 0 on signup if the otp is not verified
          const phone_number_verified=0;
          return await this.phoneVerificationService.sentCode(createPhoneVerificationDto,res,phone_number_verified);
        }
      }
    }

    // login functionality

    else{
      // sign In functionality check the user
      const is_user_exist = await this.userService.isUserAlreadyExist(createPhoneVerificationDto.phone_number)
      if(is_user_exist){
        // if user exist then sent otp
        // response will be 2 for login screen 
        const phone_number_verified=2;
        return await this.phoneVerificationService.sentCode(createPhoneVerificationDto,res,phone_number_verified);
      }else{
        // return user not exist
        return res.status(400).json({message:"user not exist",status:400})
      }
    }


  }

  @Post("verifyCode")
  verifyCode(@Body() phoneVerificationDto: PhoneVerificationDto,@Res({passthrough:true}) res:Response) {
    return this.phoneVerificationService.verifyCodeTwilio(phoneVerificationDto,res);
  }

  @Post("login")
  async login(@Body() phoneVerificationDto: PhoneVerificationDto,@Res({passthrough:true}) res:Response){
    const is_user_exist = await this.userService.isUserAlreadyExist(phoneVerificationDto.phone_number)
    if(!is_user_exist) return res.status(400).json({message:"user is not registered",status:400});
    const verify = await this.phoneVerificationService.verify(phoneVerificationDto.phone_number,phoneVerificationDto.code,res);
    // const verify = true;
    if(verify){
      return this.phoneVerificationService.verifyLoginOnPhone(phoneVerificationDto.phone_number,res)
    }
    return res.status(HttpStatus.UNAUTHORIZED).json({message:"Code is not valid",status:400})
    
  }

  @Get("isPhoneExist/:phone_number")
  isphoneExist(@Param("phone_number") phone_number:string,@Res({passthrough:true}) res:Response){
    return this.phoneVerificationService.isPhoneExist({phone_number},res);
  }

  @Get("getEmailotp/:email")
  async getemailOtp(@Param("email") email:string,@Res({passthrough:true}) res:Response){
    return this.phoneVerificationService.verifyUserEmail(email,res)
  }


}
