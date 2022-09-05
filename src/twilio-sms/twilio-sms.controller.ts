import { Controller } from '@nestjs/common';
import { TwilioSmsService } from './twilio-sms.service';

@Controller('twilio-sms')
export class TwilioSmsController {
  constructor(private readonly twilioSmsService: TwilioSmsService) {}
}
