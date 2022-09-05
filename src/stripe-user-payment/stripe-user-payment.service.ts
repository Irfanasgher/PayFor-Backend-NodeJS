import { Injectable } from '@nestjs/common';
import { CreateStripeUserPaymentDto } from './dto/create-stripe-user-payment.dto';
import { UpdateStripeUserPaymentDto } from './dto/update-stripe-user-payment.dto';

@Injectable()
export class StripeUserPaymentService {
  create(createStripeUserPaymentDto: CreateStripeUserPaymentDto) {
    return 'This action adds a new stripeUserPayment';
  }

  findAll() {
    return `This action returns all stripeUserPayment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stripeUserPayment`;
  }

  update(id: number, updateStripeUserPaymentDto: UpdateStripeUserPaymentDto) {
    return `This action updates a #${id} stripeUserPayment`;
  }

  remove(id: number) {
    return `This action removes a #${id} stripeUserPayment`;
  }
}
