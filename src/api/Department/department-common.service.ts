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
        const page = parseInt(pageNumber) + 1 || 1; // pageNumber
        const skip = (page - 1) * limit; // parse the skip to number
        const totalDepartments = await this.departmentModel.find({ isActive: true });
        const departmentResponse = await this.departmentModel.find({ isActive: true })
            .skip(skip)                 // use 'skip' first
            .limit(limit)
            .sort({ _id: -1 })
        if (departmentResponse.length === 0) {
            throw new HttpException('No companies available', HttpStatus.NOT_FOUND);
        }
        return {
            pageNo: pageNumber,
            pageLimit: limit,
            totalDepartments: totalDepartments.length,
            departments: departmentResponse
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
            throw new HttpException('Department not found', HttpStatus.NOT_FOUND);
        }
    }

    /**
     * 
     * @param deptUniqId 
     */
    async deleteDepartmentById(deptUniqId: string): Promise<any> {
        return await this.departmentModel.updateOne({ departmentUniqueId: deptUniqId }, { $set: { isActive: false } });
    }

    /**
     * 
     * @param companyId : string
     */
    async getDepartmentByCompanyId(companyId: string): Promise<any> {
        return await this.departmentModel.find({ companiesList: { $in: [companyId] } });
    }

    async updateDepartmentById(deptUniqId: string, updateRequest: DepartmentRequstDto, oldData: any): Promise<any> {
        try {
            const newData = { ...oldData, ...updateRequest };
            delete newData._id;
            delete newData.departmentName;
            delete newData.departmentUniqueId;
            delete newData.__v;
            newData.updatedOn = new Date().toISOString();
            const update = await this.departmentModel.updateOne({ departmentUniqueId: deptUniqId }, { $set: newData });
            if (update.ok) {
                return 'Department updated successfully';
            }
            else {
                return 'Department update failed';
            }
        } catch (error) {
            throw error;
        }
    }
}
