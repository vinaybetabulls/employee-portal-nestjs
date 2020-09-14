import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { OrganizationController } from './organization.controller';
import { organizationProviders } from './organization.prover';
import { OrganizationService } from './organization.service';

@Module({
  imports: [DatabaseModule],
  controllers: [OrganizationController],
  providers: [
      OrganizationService,
      ...organizationProviders
  ]
})
export class OrganizationModule {}