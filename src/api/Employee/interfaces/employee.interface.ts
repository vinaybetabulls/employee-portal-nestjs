import { Document } from 'mongoose';

/**
 * Employee user permissions ENUm
 */
export enum UserPermission {
    CREATE = "CREATE",
    VIEW = "VIEW",
    DELETE = "DELETE",
    EDIT ="EDIT",
    ADDITIONAL = "ADDITIONAL"
}

/**
 * Employee DB Interface
 */
export interface EmployeeInterface extends Document {
    readonly firstName: string;
    readonly lastName: string;
    readonly middleName: string;
    readonly userName: string;
    readonly email: string;
    password: string;
    readonly phone: string;
    roles: UserPermission;
    readonly permissons: string;
}

