import * as mongoose from 'mongoose';
import * as Employee from '../../../config/employee.default';

export const EmployeePermissionSchema = new mongoose.Schema({
    roles: { type: Array, default: Employee.employeeRole },
    permissions: { type: Array, default: Employee.employeeDefaultAction },
    empUniqueId: { type: String },
    empId: { type: String }
})