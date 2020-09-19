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
    jobType: { type: String, default: 'Full Time' },
    workType: { type: String },
    bloodGroup: { type: String },
    workExperience: {
        years: { type: Number },
        months: { type: Number }
    },
    dob: { type: Date },
    fathersName: { type: String },
    gender: { type: String },
    motherTounge: { type: String },
    nationality: { type: String },
    maritalStatus: { type: String },
    profileImageURL: { type: String },
    aadharCardNumber: { type: String },
    panCardNumber: { type: String },

    dateOfJoining: { type: Date },
    organization: { id: { type: String }, name: { type: String } },
    company: { id: { type: String }, name: { type: String } },
    designation: { id: { type: String }, name: { type: String } },
    department: { id: { type: String }, name: { type: String } },
    empId: { type: String, required: true },
    empUniqueId: { type: String },
    createdBy: {
        empUniqueId: { type: String },
        empUserName: { type: String }
    }
}, { timestamps: { createdAt: 'createdOn', updatedAt: 'updatedOn' } })