import { Injectable } from "@nestjs/common";
import { v4 as uuid } from 'uuid';

import { DepartmentCommonservice } from "./department-common.service";
import { DepartmentRequstDto } from "./dto/department-request.dto";

@Injectable()
export class DepartmentService {
    constructor(private commonservice: DepartmentCommonservice) { }

    /**
     * 
     * @param request 
     * @param user 
     */
    async createDepartment(request: DepartmentRequstDto, user: any): Promise<any> {
        try {
            const departmentUniqyeId = uuid();
            return this.commonservice.createDepartment(request, departmentUniqyeId, user);
        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * @param pageNumber 
     * @param pageLimit 
     */
    async getDepartmentList(pageNumber: string, pageLimit: string): Promise<any> {
        try {
            return await this.commonservice.getDepartmentList(pageNumber, pageLimit);
        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * @param empId 
     */
    async getDepartmentByEmpId(empId: string): Promise<any> {
        try {
            return await this.commonservice.getDepartmentByEmpId(empId);
        } catch (error) {
            throw error;
        }
    }

    async deleteDepartmentById(deptUniqId: string): Promise<any> {
        try {
            await this.commonservice.getDepartmentById(deptUniqId);
            return this.commonservice.deleteDepartmentById(deptUniqId);
        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * @param deptUniqId 
     */
    async getDepartmentById(deptUniqId: string): Promise<any> {
        try {
            return await this.commonservice.getDepartmentById(deptUniqId);
        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * @param companyId 
     */
    async getDepartmentByCompanyId(companyId: string): Promise<any> {
        try {
            return await this.commonservice.getDepartmentByCompanyId(companyId);
        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * @param deptUniqId 
     * @param request 
     */
    async updateDepartmentById(deptUniqId: string, request: DepartmentRequstDto): Promise<any> {
        try {
            // check and get department details
            const departmentId = await this.commonservice.getDepartmentById(deptUniqId);
            return await this.commonservice.updateDepartmentById(deptUniqId, request, departmentId?.department.toJSON());
        } catch (error) {
            throw error;
        }
    }
}