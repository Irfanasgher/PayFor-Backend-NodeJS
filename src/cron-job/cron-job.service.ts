import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';
import { CheckoutCardService } from 'src/checkout-card/checkout-card.service';
import { InstallmentPayoutService } from 'src/installment-payout/installment-payout.service';

@Injectable()
export class CronJobService {

    constructor(
        private readonly installmentService : InstallmentPayoutService,
        private readonly checkout : CheckoutCardService
    ){}

    private readonly logger = new Logger(CronJobService.name);

    @Cron(CronExpression.EVERY_DAY_AT_3AM)
    async getAllunPaidInstallment() {
        const data=await this.installmentService.getAllunPaidInstallment();
        
        data.forEach(async(installment)=>{
            let paymentDetail = {
                installment_id : installment.id,
                user_id : installment.user_id,
                amount : installment.installment_amount,
                currency : installment.orderDetail.isoCurrency

            }
            const res="";
            await this.checkout.payment(paymentDetail,res)
            console.log(paymentDetail);
        })
    };


    @Cron(CronExpression.EVERY_DAY_AT_1AM)
    async getAllunPaidTransactionFailedInstallment() {

        const data=await this.installmentService.getAllunPaidTransactionFailedInstallment();
        console.log(data);
        data.forEach(async(installment)=>{
            let paymentDetail = {
                installment_id : installment.id,
                user_id : installment.user_id,
                amount : installment.installment_amount,
                currency : installment.orderDetail.isoCurrency

            }
            const res="";
            await this.checkout.payment(paymentDetail,res)
            console.log(paymentDetail);
        })
    }
}
