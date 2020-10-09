import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Model } from 'mongoose';

import { CompanyInterface } from "../Company/interfaces/company.interface";
import { EmployeeInterface } from "../Employee/interfaces/employee.interface";
import { DepartmentRequstDto } from "./dto/department-request.dto";
import { DepartmentInterface } from "./interfaces/department.interface";

@Injectable()
export class DepartmentCommonservice {
    constructor(
        @Inject('COMPANY_MODEL')
        private companyModel: Model<CompanyInterface>,
        @Inject('DEPARTMENT_MODEL')
        private departmentModel: Model<DepartmentInterface>,
        @Inject('EMPLOYEE_MODEL')
        private employeeModel: Model<EmployeeInterface>
    ) { }

    /**
     * 
     * @param request 
     * @param departmentUniqueId 
     * @param creadtedBy 
     */
    async createDepartment(request: DepartmentRequstDto, departmentUniqueId: string, creadtedBy: any): Promise<any> {
        let payload = {};
        payload = { ...payload, ...request, departmentUniqueId, creadtedBy }
        const depPayload = this.departmentModel(payload);
        return await depPayload.save();
    }

    /**
     * 
     * @param pageNumber 
     * @param pageLimit 
     */
    async getDepartmentList(pageNumber, pageLimit): Promise<any> {
        const limit = parseInt(pageLimit, 10) || 10; // limit to number
        const page = parseInt(pageNumber) || 1; // pageNumber
        const skip = (page - 1) * limit; // parse the skip to number
        const departmentResponse = await this.departmentModel.find({ isActive: true })
            .skip(skip)                 // use 'skip' first
            .limit(limit)
        if (departmentResponse.length === 0) {
            throw new HttpException('No companies available', HttpStatus.NOT_FOUND);
        }
        return {
            pageNo: pageNumber,
            pageLimit: limit,
            totalCompanies: departmentResponse.length,
            companies: departmentResponse
        }
    }

    /**
     * 
     * @param empId 
     */
    async getDepartmentByEmpId(empId: string): Promise<any> {
        const company = await this.employeeModel.findOne({ empUniqueId: empId }, { company: 1 });
        if (company) {
            const department = await this.departmentModel.findOne({ companiesList: { $in: [company.company.id] } });
            if (!department) {
                throw new HttpException('No Departments found', HttpStatus.NOT_FOUND);
            }
            return department;
        }
        else {
            throw new HttpException('No Result found', HttpStatus.NOT_FOUND);
        }
    }

    /**
     * 
     * @param deptUniqId 
     */
    async getDepartmentById(deptUniqId: string): Promise<any> {
        const dept = await this.departmentModel.findOne({ $and: [{ isActive: true }, { departmentUniqueId: deptUniqId }] });
        if (dept) {
            return { department: dept }
        }
        else {
            throw new HttpException('Department not fodun', HttpStatus.NOT_FOUND);
        }
    }

    async deleteDepartmentById(deptUniqId: string): Promise<any> {
        return await this.departmentModel.updateOne({ departmentUniqueId: deptUniqId }, { $set: { isActive: false } });
    }
}