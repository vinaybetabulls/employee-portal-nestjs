import { Module } from '@nestjs/common';
import { CompanyModule } from './api/Company/company.module';
import { EmployeeModule } from './api/Employee/employee.module';
import { OrganizationModule } from './api/Organization/organization.module';
import { UtilModule } from './api/Utils/utils.module';
import { UtilService } from './api/Utils/utils.service';
import { AppController } from './app.controller';
import { EmployeeProviders } from './app.provider';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { databaseProviders } from './database/database.providers';
import { DesignationModule } from './api/Designation/designation.module';

@Module({
  imports: [DatabaseModule, OrganizationModule, EmployeeModule, UtilModule, CompanyModule, DesignationModule],
  controllers: [AppController],
  providers: [AppService, UtilService,
    ...databaseProviders,
    ...EmployeeProviders]
})
export class AppModule { }
