import { PartialType } from '@nestjs/swagger';
import { CreateCheckoutCardDto } from './create-checkout-card.dto';

export class UpdateCheckoutCardDto extends PartialType(CreateCheckoutCardDto) {}
