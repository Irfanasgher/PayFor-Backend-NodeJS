import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { InstallmentPayoutService } from './installment-payout.service';
import { CreateInstallmentPayoutDto } from './dto/create-installment-payout.dto';
import { UpdateInstallmentPayoutDto } from './dto/update-installment-payout.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags("user-installment-payout")
@Controller('installment-payout')
export class InstallmentPayoutController {
  constructor(private readonly installmentPayoutService: InstallmentPayoutService) {}


  @Get("isInstallmentPaid/:id")
  isInstallmentPaid(@Param('id') id:number){
    return this.installmentPayoutService.isInstallmentPaid(id)
  }

  // @Patch('PayInstallment/:installmentId')
  // update(@Param('installmentId') installmentId: string, @Res() res:Response
  // // @Body() updateInstallmentPayoutDto: UpdateInstallmentPayoutDto
  // ) {
  //   return this.installmentPayoutService.payInstallmentForNop(+installmentId,res);
  // }


}
