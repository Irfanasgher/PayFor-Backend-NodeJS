import { PartialType } from '@nestjs/swagger';
import { CreateForgetPasswordDto } from './create-forget-password.dto';

export class UpdateForgetPasswordDto extends PartialType(CreateForgetPasswordDto) {}
