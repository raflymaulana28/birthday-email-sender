"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const node_cron_1 = __importDefault(require("node-cron"));
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./routes/user"));
const User_1 = require("./entities/User");
const send_birthday_1 = require("./services/send-birthday");
require("dotenv").config();
const app = (0, express_1.default)();
const port = 9000;
app.use(express_1.default.json());
app.use(user_1.default);
app.get("/", (req, res) => {
    res.send("Hello, Express with TypeScript and TypeORM!");
});
node_cron_1.default.schedule("* * * * * *", async () => {
    (0, send_birthday_1.sendBirthdayMessages)(await User_1.User.find());
});
async function initializeDatabase() {
    try {
        await (0, typeorm_1.createConnection)({
            name: "default",
            type: "mongodb",
            url: "mongodb://murahYohAyok55:persib123@cluster0-shard-00-00.2vhgo.mongodb.net:27017,cluster0-shard-00-01.2vhgo.mongodb.net:27017,cluster0-shard-00-02.2vhgo.mongodb.net:27017/?ssl=true&replicaSet=atlas-zowunz-shard-0&authSource=admin&retryWrites=true&w=majority",
            entities: [User_1.User],
            synchronize: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to the database");
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
    catch (error) {
        console.error("Error connecting to the database:", error);
    }
}
initializeDatabase();
