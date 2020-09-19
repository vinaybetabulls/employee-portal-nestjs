import { Inject, Injectable } from "@nestjs/common";
import { Model } from 'mongoose';
import { EmployeeInterface } from "./interfaces/employee.interface";



Injectable()
export class EmployeeCommonService {
    constructor(
        @Inject('EMPLOYEE_MODEL')
        private employeeModel: Model<EmployeeInterface>,
    ) { }

    /**
     * 
     * @param username 
     */
    async checkUserAlreadyExists(username: string): Promise<any> {
        try {
            return await this.employeeModel.findOne({ $and: [{ $or: [{ userName: username.toLocaleLowerCase() }, { email: username.toLocaleLowerCase() }, { empId: username }] }, { isActive: true }] })
        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * @param email 
     * @param empId 
     * @param userName 
     */
    async checkEmployeeExists(email: string, empId: string, userName: string) {
        return await this.employeeModel.findOne({ $or: [{ email: email.toLocaleLowerCase() }, { userName: userName.toLocaleLowerCase() }, { empId: empId }] })
    }

    /**
     * 
     * @param request 
     * @param createdBy 
     * @param empUniqueId 
     * @param decryptPassword 
     */
    async createEmployee(request, createdBy, empUniqueId, decryptPassword) {
        try {
            request['createdBy'] = createdBy;
            request['empUniqueId'] = empUniqueId;
            request['password'] = decryptPassword;
            const emp = new this.employeeModel(request);
            return await emp.save();
        } catch (error) {
            throw error;
        }
    }
}