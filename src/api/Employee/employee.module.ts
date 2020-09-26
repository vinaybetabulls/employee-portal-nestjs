import { Module } from '@nestjs/common';
import { EmployeeProviders } from 'src/app.provider';
import { DatabaseModule } from 'src/database/database.module';
import { databaseProviders } from 'src/database/database.providers';
import { companyProviders } from '../Company/company.provider';
import { UtilModule } from '../Utils/utils.module';
import { UtilService } from '../Utils/utils.service';
import { EmployeeCommonService } from './employee-common.service';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';

@Module({
  imports: [DatabaseModule, UtilModule],
  controllers: [EmployeeController],
  providers: [EmployeeService, UtilService, EmployeeCommonService,
    ...databaseProviders,
    ...EmployeeProviders,
    ...companyProviders]
})
export class EmployeeModule { }
