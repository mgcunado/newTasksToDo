// use this file with using -d option (path-to-datasource-config) in migrations
import { join } from 'path';

import { DataSource, DatabaseType, DataSourceOptions } from 'typeorm';
export const myDataSource = new DataSource({
  type: process.env.DATABASE_TYPE as DatabaseType,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [join(__dirname, '**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, 'migrations/*{.ts,.js}')],
  synchronize: true
} as DataSourceOptions);
