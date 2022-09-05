import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderInstallmentPlanDto } from './create-order-installment-plan.dto';

export class UpdateOrderInstallmentPlanDto extends PartialType(CreateOrderInstallmentPlanDto) {}
