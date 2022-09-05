import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import axios from 'axios';
import { Response } from 'express';
import { userInfo } from 'os';
import { MailBoxService } from 'src/mail-box/mail-box.service';
import { CheckoutCardService } from './checkout-card.service';
import { CreateCheckoutCardDto } from './dto/create-checkout-card.dto';
import { FirstPaymentDto } from './dto/first-payment.dto';
import { Paymentdto } from './dto/payment.dto';
import { Payment3dSecureDto } from './dto/payment3dSecure.dto';
import { UpdateCheckoutCardDto } from './dto/update-checkout-card.dto';
import { UpdatePaymentStatus } from './dto/updatePaymentStatus.dto';

@ApiTags("CHECKOUT CARD")
@Controller('checkout-card')
export class CheckoutCardController {
  constructor(
    private readonly checkoutCardService: CheckoutCardService,
    private readonly mailboxService : MailBoxService
    ) {}

  @Post("addCard")
   create(@Body() createCheckoutCardDto: CreateCheckoutCardDto,@Res({passthrough:true}) res:Response) {
    return this.checkoutCardService.create(createCheckoutCardDto,res,true);
  }

  // @Post("firstPayment")
  //  paymentTest(@Body() firstPaymentDto: FirstPaymentDto, @Res({passthrough:true}) res:Response) {
  //   return this.checkoutCardService.checkPayment(firstPaymentDto);
  // }

  @Get("paymentDetail")
  getPaymentDetail(@Res({passthrough:true}) res:Response) {
    return this.checkoutCardService.getPaymentDetail();
  }

  @Post("payment3dSecure")
  payment3dSecure(@Body() payment3dSecuredto: Payment3dSecureDto,@Res() res:Response) {
    return this.checkoutCardService.payment3dSecure(payment3dSecuredto,res);
  }

  // installment payout
  @Post("clearInstallment")
  payout(@Body() paymentdto: Paymentdto,@Res() res:Response) {
    return this.checkoutCardService.clearInstallments(paymentdto,res);
  }

  @Get("getCard/:user_id")
  getcard(@Param('user_id') user_id:number,@Res() res:Response){
    return this.checkoutCardService.getCard(user_id,res)
  }

  @Delete("removeCard/:cardId")
  deleteCard(@Param("cardId") cardId:number , @Res() res:Response){
    return this.checkoutCardService.deleteCard(cardId,res);
  }


  @Patch("updatePaymentStatus")
  updatePaymentStatus(@Body() paymentStatusdto:UpdatePaymentStatus, @Res() res:Response){
    return this.checkoutCardService.updatePaymentDetailStatus(paymentStatusdto,res)
  }


  
  @Get("transactionfail/:email")
  transactionFailed(@Param('email') email:string)
  {
    console.log(email,"Eeeeeeee")
    return this.mailboxService.TransactionFail(email);
  }


  @Get("getCardCompleteDetail/:card_number")
  getCardCompleteDetail(@Param("card_number") card_number:string){
    return this.checkoutCardService.CardType(card_number)
  }


}
