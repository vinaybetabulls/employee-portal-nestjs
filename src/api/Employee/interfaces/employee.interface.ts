import { Document } from 'mongoose';

export interface EmployeeInterface extends Document {
    readonly employeeFirstName: string;
    readonly employeeLastName: string;
    readonly employeeMiddleName: string;
    readonly employeeUserName: string;
    readonly employeeEmail: string;
    employeePassword: string;
    readonly employeePhone: string;
    employeeRole: string;
}