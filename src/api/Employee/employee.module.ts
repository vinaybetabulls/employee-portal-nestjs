import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { databaseProviders } from 'src/database/database.providers';
import { UtilModule } from '../Utils/Utils.module';
import { UtilService } from '../Utils/utils.service';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';

@Module({
  imports: [DatabaseModule, UtilModule],
  controllers: [EmployeeController],
  providers: [EmployeeService,UtilService,
  ...databaseProviders]
})
export class EmployeeModule {}
