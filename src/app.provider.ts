import { Connection } from 'mongoose';
import { EmployeeSchema } from './api/Employee/schemas/employee.schema';
import { EmployeePermissionSchema } from './api/Employee/schemas/employee-permissions.scheama';
export const EmployeeProviders = [
  {
    provide: 'EMPLOYEE_MODEL',
    useFactory: (connection: Connection) => connection.model('Employee', EmployeeSchema),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'EMPLOYEE_PERMISSIONS_MODEL',
    useFactory: (connection: Connection) => connection.model('EmployeePermission', EmployeePermissionSchema),
    inject: ['DATABASE_CONNECTION'],
  },

];