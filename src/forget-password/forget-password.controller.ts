
import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { ForgetPasswordService } from './forget-password.service';
import { CreateForgetPasswordDto } from './dto/create-forget-password.dto';
import { VerifyCode } from './dto/verify-code';
import { AccountService } from 'src/account/account.service';
import { UpdatePasswordDto } from './dto/update-password-dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';


@ApiTags("Forget-password")
@Controller('forget-password')
export class ForgetPasswordController {
  constructor(
    private readonly forgetPasswordService: ForgetPasswordService,
    private readonly accountService : AccountService
    ) {}

  @Post("sendCode")
  async sendCode(@Body() createForgetPasswordDto: CreateForgetPasswordDto,@Res({passthrough:true}) res:Response) {
    await this.forgetPasswordService.sendCode(createForgetPasswordDto,res);
    // console.log(data,"ddddd");
  }

  @Post("verifyCode")
  verifyCode(@Body() verifycode: VerifyCode) {
    return this.forgetPasswordService.verifyCode(verifycode);
  }


  @Get(':email')
  resendCode(@Param('email') email: string) {
    return this.forgetPasswordService.resendCode(email);
  }


  @Post("changePassword")
  updatePassword(@Body() updatedPassword:UpdatePasswordDto,@Res() res:Response){
    return this.accountService.updatePassword(updatedPassword,res)
  }


}
