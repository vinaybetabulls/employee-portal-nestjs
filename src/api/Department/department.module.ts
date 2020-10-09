import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { companyProviders } from "../Company/company.provider";
import { departmentProviders } from './department.provider';
import { UtilModule } from "../Utils/utils.module";
import { DepartmentController } from "./department.controller";
import { DepartmentService } from "./department.service";
import { DepartmentCommonservice } from "./department-common.service";
import { EmployeeProviders } from "src/app.provider";

@Module({
    imports: [DatabaseModule, UtilModule],
    controllers: [DepartmentController],
    providers: [DepartmentService, DepartmentCommonservice, ...companyProviders, ...departmentProviders, ...EmployeeProviders]
})

export class DepartmentModule { }