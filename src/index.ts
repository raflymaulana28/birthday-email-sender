import "reflect-metadata";
import { createConnection, Connection } from "typeorm";
import cron from "node-cron";
import express, { Request, Response } from "express";
import userRoutes from "./routes/user";
import { User } from "./entities/User";
import { sendBirthdayMessages } from "./services/send-birthday";
require("dotenv").config();
const app = express();
const port = 9000;
app.use(express.json());
app.use(userRoutes);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express with TypeScript and TypeORM!");
});
cron.schedule("* * * * * *", async () => {
  sendBirthdayMessages(await User.find());
});

async function initializeDatabase() {
  try {
    await createConnection({
      name: "default",
      type: "mongodb",
      url: "mongodb://murahYohAyok55:persib123@cluster0-shard-00-00.2vhgo.mongodb.net:27017,cluster0-shard-00-01.2vhgo.mongodb.net:27017,cluster0-shard-00-02.2vhgo.mongodb.net:27017/?ssl=true&replicaSet=atlas-zowunz-shard-0&authSource=admin&retryWrites=true&w=majority",
      entities: [User],
	  synchronize: true,
	  useNewUrlParser: true,
	  useUnifiedTopology: true,
    });
    console.log("Connected to the database");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

initializeDatabase();
