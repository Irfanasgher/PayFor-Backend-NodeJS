import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { SmsService } from './sms.service';
import { CreateSmDto } from './dto/create-sm.dto';
import { UpdateSmDto } from './dto/update-sm.dto';
import { ApiTags } from '@nestjs/swagger';
import {OrderDispatchSmsDto} from './dto/orderdispatch.dto';
import { Response } from 'express';
import { TransactionDto } from './dto/transaction.dto';
import { OrderDispatchFailedSmsDto } from './dto/orderdispatchingFail.dto';

@ApiTags("sms")
@Controller('sms')
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @Post("orderdispatchedsms")
  orderdispatched(@Body() orderDetail:OrderDispatchSmsDto){
    return this.smsService.orderdispatched(orderDetail)
  }

  @Post("orderdispatchedInternationsms")
  orderdispatchedforInternational(@Body() orderDetail:OrderDispatchFailedSmsDto){
    return this.smsService.transactionFailed(orderDetail)
  }

  @Post("transactionFailed")
  transactionFailed(@Body() transaction : TransactionDto, @Res() res:Response){
    return this.smsService.transactionFailed(transaction)
  }

}
