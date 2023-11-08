import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Log } from "../entities/Log";
require("dotenv").config();


export const appDataSource = new DataSource({
  name: "default",
  type: "mongodb",
  url: process.env.MONGO_URL,
  entities: [User, Log],
  synchronize: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
