import { Document } from 'mongoose';

/**
 * Employee user permissions ENUm
 */
export enum EmpPermission {
    CREATE = "CREATE",
    VIEW = "VIEW",
    DELETE = "DELETE",
    EDIT = "EDIT",
    ADDITIONAL = "ADDITIONAL"
}
export interface EmployeePermission extends Document {
    readonly permissions: EmpPermission[];
    readonly roles: string[],
    readonly empUniqueId: string;
    readonly empId: string;
}