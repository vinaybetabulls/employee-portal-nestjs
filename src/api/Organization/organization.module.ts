import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UtilModule } from '../Utils/Utils.module';
import { UtilService } from '../Utils/utils.service';
import { OrganizationCommonService } from './organization.common.service';
import { OrganizationController } from './organization.controller';
import { organizationProviders } from './organization.prover';
import { OrganizationService } from './organization.service';

@Module({
  imports: [DatabaseModule, UtilModule],
  controllers: [OrganizationController],
  providers: [
    OrganizationService, UtilService, OrganizationCommonService,
    ...organizationProviders
  ]
})
export class OrganizationModule { }