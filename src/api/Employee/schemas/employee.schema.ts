import * as mongoose from 'mongoose';
import * as Employee from '../../../config/employee.default';
export const EmployeeSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    middleName: { type: String },
    userName: { type: String },
    email: { type: String },
    phone: { type: String },
    password: { type: String, default: Employee.employeePassword },
    isFirstTimeLogin: { type: Boolean, default: true },
    roles: { type: Array, default: Employee.employeeRole },
    permissions: { type: Array, default: Employee.employeeDefaultAction },
    isActive: { type: Boolean, default: true },
    jobType: { type: String, default: 'permanent' },
    workType: { type: String },
    bloodGroup: { type: String },
    workExperience: {
        years: { type: Number },
        months: { type: Number }
    },
    empUniqueId: {type: String},
}, { timestamps: { createdAt: 'createdOn', updatedAt: 'updatedOn' } })