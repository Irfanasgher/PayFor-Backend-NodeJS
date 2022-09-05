import { Controller, Get, Post, Body, Patch, Param, Delete, InternalServerErrorException, UseGuards,Put, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/jwt/jwt_strategy/jwt-auth.guard';
import {Response} from 'express';
import { UpdateUserDto } from './dto/update-user.dto';
import { Contact } from './dto/contact.dto';
import { MailBoxService } from 'src/mail-box/mail-box.service';
import { LoginDto } from './dto/login.dto';

@ApiTags("user")
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly mailBoxService : MailBoxService
    ) {}

    @Post("signup")
    async signUp(@Body() createUserDto: CreateUserDto,@Res() res:Response ) {
      return await this.userService.signUp(createUserDto,res);
    }

    @Post("login")
    async login(@Body() logindto: LoginDto,@Res({passthrough:true}) res:Response ) {
      return await this.userService.login(logindto,res);
    }
    

  @Put("updateProfile/:userId")
  async updateProfile(@Param('userId') userId:number ,@Body() updateUserDto: UpdateUserDto,@Res() res:Response ) {
    return await this.userService.update(userId,updateUserDto,res);
  }

  
  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string,@Res({passthrough:true}) res:Response ) {
    return  await this.userService.findOne(+id,res);
  }
  
  
  // @UseGuards(JwtAuthGuard)
  @Get('admin/getallcustomers')
  async getallcustomers(@Res() res:Response ) {
    return  await this.userService.getallcustomers(res);
  }

  @Get('admin/getallcustomers/:store_id')
  async getallcustomersByCompanyId(@Param('store_id') store_id:number, @Res() res:Response ) {
    return  await this.userService.getallcustomersByCompanyId(res,store_id);
  }
  
  @Get('dashboard/getallcustomersNumber')
  async getallcustomersNumber(@Res() res:Response ) {
    return  await this.userService.getallcustomersNumber(res);
  }
  
  @Get('dashboard/getallcustomersNumberByMerchant/:store_id')
  async getallcustomersNumberByMerchant(@Res() res:Response,@Param("store_id") store_id:number) {
    return  await this.userService.getallcustomersNumberByMerchant(res,store_id);
  }
  

  @Post('contact')
  async contact(@Body() contact: Contact, @Res() res:Response ) {
    return  await this.mailBoxService.contactUs(contact,res);
  }

  @Patch("updateCreditLimit/:user_id/:credit_limit")
  updateUserCreditLimit(@Param("user_id") user_id:number,@Param("credit_limit") credit_limit:number,@Res() res:Response){
    return this.userService.updateUserCreditLimit(user_id,credit_limit,res)
  }


  @Get("dashboard/getAllCustomerMonthlyGraph")
  getAllCustomerMonthlyGraph(){
    return this.userService.customerGraph()
  }


}
