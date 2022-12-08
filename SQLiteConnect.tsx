import { DataSource } from "typeorm";
import * as SQLite from "expo-sqlite";

import { Usuarios } from "./Usuarios";

export const AppDataSource = new DataSource({
  type: "expo",
  driver: SQLite,
  database: "db",
  entities: [Usuarios],
  synchronize: true,
  dropSchema: true,
  logging: true,
});

export const initialize = AppDataSource.initialize();
