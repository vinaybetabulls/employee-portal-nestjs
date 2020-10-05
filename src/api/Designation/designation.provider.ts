import { Connection } from 'mongoose';
import { DesignationSchema } from './schemas/designation.schema';

export const DesignationProviders = [
  {
    provide: 'DESIGNATION_MODEL',
    useFactory: (connection: Connection) => connection.model('Designation', DesignationSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];