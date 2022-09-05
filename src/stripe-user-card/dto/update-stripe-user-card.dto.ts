import { PartialType } from '@nestjs/mapped-types';
import { CreateStripeUserCardDto } from './create-stripe-user-card.dto';

export class UpdateStripeUserCardDto extends PartialType(CreateStripeUserCardDto) {}
