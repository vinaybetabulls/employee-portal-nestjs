import { Connection } from 'mongoose';
import { EmployeeSchema } from './api/Employee/schemas/employee.schema'
export const UserProviders = [
  {
    provide: 'EMPLOYEE_MODEL',
    useFactory: (connection: Connection) => connection.model('Employee', EmployeeSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];