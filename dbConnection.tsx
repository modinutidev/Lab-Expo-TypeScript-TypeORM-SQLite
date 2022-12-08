import { DataSource } from "typeorm";
import * as SQLite from "expo-sqlite";

import { User } from "./User.entity";

export const AppDataSource = new DataSource({
  type: "expo",
  driver: SQLite,
  database: "db",
  entities: [User],
  synchronize: true,
  dropSchema: true,
});

export const connect = AppDataSource.initialize();
