import { Document } from 'mongoose';

export interface DepartmentInterface extends Document {
    readonly departmentName: string;
    readonly departmentCategory: string;
    readonly companiesList: string[];
    departmentUniqueId: string;
}