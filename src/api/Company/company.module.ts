import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { UtilModule } from "../Utils/Utils.module";
import { CompanyCommonService } from "./company.common.service";
import { CompanyController } from "./company.controller";
import { companyProviders } from "./company.provider";
import { CompanyService } from "./company.service";

@Module({
    imports: [DatabaseModule, UtilModule],
    controllers: [CompanyController],
    providers: [CompanyService, CompanyCommonService, ...companyProviders]
})

export class CompanyModule {}