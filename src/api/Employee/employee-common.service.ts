import { Inject, Injectable } from "@nestjs/common";
import { Model } from 'mongoose';
import { EmployeeInterface } from "./interfaces/employee.interface";



Injectable()
export class EmployeeCommonService {
    constructor(
        @Inject('EMPLOYEE_MODEL')
        private employeeModel: Model<EmployeeInterface>,
    ) { }

    async checkUserAlreadyExists(username: string): Promise<any> {
        try {
            return await this.employeeModel.findOne({ $or: [{ userName: username.toLocaleLowerCase() }, { email: username.toLocaleLowerCase() }] })
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
    async checkEmployeeExists(email, empId, userName) {
        return await this.employeeModel.findOne({ $or: [{ email: email.toLocaleLowerCase() }, { userName: userName.toLocaleLowerCase() }, { empId: empId }] })
    }

    async createEmployee(request, createdBy, empUniqueId) {
        try {
            request['createdBy'] = createdBy;
            request['empUniqueId'] = empUniqueId;
            const emp = new this.employeeModel(request);
            return await emp.save();
        } catch (error) {
            throw error;
        }
    }
}