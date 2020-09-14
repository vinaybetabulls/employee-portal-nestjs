import { Module } from '@nestjs/common';
import { EmployeeModule } from './api/Employee/employee.module';
import { OrganizationModule } from './api/Organization/organization.module';
import { UtilModule } from './api/Utils/Utils.module';
import { UtilService } from './api/Utils/utils.service';
import { AppController } from './app.controller';
import { UserProviders } from './app.provider';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { databaseProviders } from './database/database.providers';

@Module({
  imports: [DatabaseModule, OrganizationModule, EmployeeModule, UtilModule],
  controllers: [AppController],
  providers: [AppService,UtilService,
  ...databaseProviders,
  ...UserProviders]
})
export class AppModule {}
