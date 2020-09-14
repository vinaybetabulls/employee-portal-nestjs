import * as mongoose from 'mongoose';
import * as dbConfig from './database.config';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(`mongodb://localhost/${process.env.DBNAME}`, dbConfig.default),
  },
];