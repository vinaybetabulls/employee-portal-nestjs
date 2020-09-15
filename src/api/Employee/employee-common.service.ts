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
}