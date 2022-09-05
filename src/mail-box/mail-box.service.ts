import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailBoxService {
    
  constructor(private mailerService:MailerService){}

  async sendMail(email,code) {
    try{

      await this.mailerService.sendMail({
        to: email,
        subject: 'change password otp',
        html: `To reset your payfor account password <br/> please enter the below code and verify it. <br/><br/> <b style='padding:10px;background:black;color:white;'>${code}</b> <br/><br/><br/> `,
      }).then((res)=>console.log(res)).catch(err=>console.log(err));

    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
    
  }

  async verifyemail(email,code){
    try{

      await this.mailerService.sendMail({
        to: email,
        subject: 'Welcome on PayFor',
        html: `Your PayFor OTP is below <br/><br/> <b style='padding:10px;background:black;color:white;'>${code}</b> <br/><br/>PayFor will never ask you for this code. Don’t share this code with anyone. `,
      }).then((res)=>console.log(res)).catch(err=>console.log(err));

    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
  }



  async orderConfirmationDetailMail(order,email) {
    try{

      await this.mailerService.sendMail({
        to: email,
        subject: 'Thank you for your PayFor order # 00'+order.id,
        html: `Hi ${order.user.first_name}, <br/> 
        Thank you for choosing PayFor.
        Your order with ${order.store.name} is confirmed. We've received your first installment amount of Rs. <b>${order.price/2+order.shipping_charges+order.assurance_amount} </b>. Your remaining installments are shown below
        <br/>
        <br/>
        <p style='margin:auto'>
          <b style='text-align:center'>YOUR PAYMENT SCHEDULE</b> <br/>
            <span>
              <b>First Installment</b>
              ${order.price/2+order.shipping_charges+order.assurance_amount}  including {assurance amount + shipping amount}
            </span>
            <br/>
            <span>
              <b>Second Installment</b>
              ${order.price/2} 
            </span>
            <br/>
        </p>
        <br/>
        <br/>
        You can log in to your PayFor account at any time to view your orders and manage your payments.<br/>
        Have any questions? Please reach out to us at support@payfor.pk and we'll be more than happy to help you.<br/>
        <b>Sincerely,</b> <br/>
        PayFor Team
        <span style='opacity:0;'>${new Date()}</span>
        `,
      }).then((res)=>console.log(res)).catch(err=>console.log(err));

    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
    
  }

  async credential(email,password) {
    try{

      await this.mailerService.sendMail({
        to: email,
        subject: 'Payfor Credential',
        html: `<b>Email</b> ${email} <br/> <b>Password</b> ${password} <br/>`,
      }).then((res)=>console.log(res)).catch(err=>console.log(err));

    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
    
  }

  async contactUs({email,subject,message},res) {
    try{
      console.log({email,subject,message})
      await this.mailerService.sendMail({
        to: email,
        subject: subject,
        html: message,
      }).then((response)=> res.status(200).json({message:'Email sent successfully',status:200})).catch(err=>res.status(502).json({err,status:502}));

    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
    
  }

  async merchantEmail(email,password){
    try{

      await this.mailerService.sendMail({
        to: email,
        subject: 'Payfor Merchant portal password ',
        html: `<b style='padding:20px;background:red;'>CODE : ${password}</b>`,
      }).then((res)=>res).catch(err=>err);

    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
    
  }

  async TransactionFail(email){
    try{
      console.log("email",email)
      await this.mailerService.sendMail({
        to: email,
        subject: 'Transaction failed on payfor ',
        html: `<b style='padding:20px;background:red;'>-----</b>`,
      }).then((res)=>console.log(res)).catch(err=>console.log(err));
      return true;
    }
    catch(err){
      throw new InternalServerErrorException(err);
    }
    
  }

}
