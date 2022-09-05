import { Module } from '@nestjs/common';
import { TwilioSmsService } from './twilio-sms.service';
import { TwilioSmsController } from './twilio-sms.controller';
import { TwilioModule } from 'nestjs-twilio';
import { twilio } from 'src/constant';


@Module({
  imports: [
    TwilioModule.forRoot({
      accountSid: twilio.sid,
      authToken: twilio.authToken,
    }),
  ],
  // controllers: [TwilioSmsController],
  providers: [TwilioSmsService],
  exports:[TwilioSmsService]
})
export class TwilioSmsModule {}
