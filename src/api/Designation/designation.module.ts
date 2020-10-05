import { Module } from '@nestjs/common';
import { DesignationController } from './designation.controller';
import { DesignationService } from './designation.service';
import { DesignationProviders } from './designation.provider';
import { DatabaseModule } from '../../database/database.module';
import { UtilModule } from '../Utils/utils.module';
import { UtilService } from '../Utils/utils.service';

@Module({
  imports: [DatabaseModule, UtilModule],
  controllers: [DesignationController],
  providers: [DesignationService, ...DesignationProviders, UtilService]
})
export class DesignationModule {}
