import "reflect-metadata";
import cron from "node-cron";
import express, { Request, Response } from "express";
import userRoutes from "./routes/user";
import { User } from "./entities/User";
import { sendBirthdayMessages } from "./services/send-birthday";
import { appDataSource } from "./config/appDataSource";
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
    await appDataSource.initialize();
    console.log("Connected to the database");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

initializeDatabase();
