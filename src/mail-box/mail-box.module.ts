import { Module } from '@nestjs/common';
import { MailBoxService } from './mail-box.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        secure: false,
        auth: {
          // user: 'no-reply@eis.sg',
          // pass: 'a4+E@%vnLq)S"&Jf',
          user: 'safyan.jelani@eis.sg',
          pass: '2015-ag-5563',
        },
      },
      defaults: {
        from: '"No Reply" <safyan.jelani@eis.sg>',
        // from: '"No Reply" <no-reply@eis.sg>',
      },

    }),
  ],
  providers: [MailBoxService],
  exports : [MailBoxService]
})
export class MailBoxModule {}
