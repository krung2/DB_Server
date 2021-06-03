import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";
import { DATABASE } from "./dotenv";
import models from '../models';

export const ormConfig: MysqlConnectionOptions = {
  type: 'mysql',
  host: DATABASE.HOST,
  port: DATABASE.DBPORT,
  username: DATABASE.USERNAME,
  password: DATABASE.PASSWORD,
  database: DATABASE.DATABASENAME,
  entities: models,
  synchronize: true,
};