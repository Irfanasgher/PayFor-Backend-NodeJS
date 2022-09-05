import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { employeeProvider } from './entities/employee.provider';
import { MailBoxModule } from 'src/mail-box/mail-box.module';

@Module({
  imports : [MailBoxModule],
  controllers: [EmployeeController],
  providers: [EmployeeService,...employeeProvider]
})
export class EmployeeModule {}
