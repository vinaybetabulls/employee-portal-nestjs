import { Connection } from 'mongoose';
import { DepartmentSchema } from './schemas/department.schema';

export const departmentProviders = [
    {
        provide: 'DEPARTMENT_MODEL',
        useFactory: (connection: Connection) => connection.model('Department', DepartmentSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];