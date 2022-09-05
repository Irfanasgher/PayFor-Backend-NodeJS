import { PartialType } from '@nestjs/mapped-types';
import { CreateStripeUserPaymentDto } from './create-stripe-user-payment.dto';

export class UpdateStripeUserPaymentDto extends PartialType(CreateStripeUserPaymentDto) {}
