import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Log } from "../entities/Log";

export const appDataSource = new DataSource({
  name: "default",
  type: "mongodb",
  url: "mongodb://murahYohAyok55:persib123@cluster0-shard-00-00.2vhgo.mongodb.net:27017,cluster0-shard-00-01.2vhgo.mongodb.net:27017,cluster0-shard-00-02.2vhgo.mongodb.net:27017/?ssl=true&replicaSet=atlas-zowunz-shard-0&authSource=admin&retryWrites=true&w=majority",
  entities: [User, Log],
  synchronize: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
