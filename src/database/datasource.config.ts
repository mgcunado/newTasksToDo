// use this file with using -d option (path-to-datasource-config) in migrations
import { join } from 'path';
import { DataSource } from 'typeorm';

export const myDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: '',
  password: '',
  database: 'new_tasks_todo',
  entities: [join(__dirname, '**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, 'migrations/*{.ts,.js}')],
  synchronize: true

});
