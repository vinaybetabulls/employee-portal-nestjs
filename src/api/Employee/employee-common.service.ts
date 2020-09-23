import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
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

    /**
     * 
     * @param empId 
     */
    async getEmployeeById(empId: string) {
        const emp = await this.employeeModel.findOne({ empUniqueId: empId });
        if (!emp) throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
        return emp;
    }

    /**
     * 
     * @param newPassowrd 
     * @param empId 
     */
    async updatePassword(newPassowrd: string, empId: string) {
        return await this.employeeModel.updateOne({ empUniqueId: empId }, { $set: { password: newPassowrd, isFirstTimeLogin: false } });
    }

    /**
     * 
     * @param permissions 
     * @param roles 
     * @param empId 
     */
    async updateEmpPermissions(permissions: string[], roles: string[], empId: string) {
        try {
            console.log('permissions..', permissions);
            console.log('roles..', roles);
            await this.employeeModel.updateOne({ empUniqueId: empId }, { "$addToSet": { "permissions": { "$each": permissions } } })
            return await this.employeeModel.updateOne({ empUniqueId: empId }, { "$addToSet": { "roles": { "$each": roles } } })

        } catch (error) {
            console.log('update emp permissions..', error);
            throw error;
        }
    }
}