import * as mongoose from 'mongoose';
import * as Employee from '../../../config/employee.default';
export const EmployeeSchema = new mongoose.Schema({
    employeeFirstName: {type: String},
    employeeLastName: {type: String},
    employeeMiddleName: {type: String},
    employeeUserName: {type: String},
    employeeEmail: {type: String},
    employeePhone: {type: String},
    employeePassword: {type: String, default: Employee.employeePassword},
    employeeIsFirstTimeLogin: {type: Boolean, default: true},
    employeeRoles: {type: Array, default: Employee.employeeRole},
    employeeActions: {type: Array, default: Employee.employeeDefaultAction}
})