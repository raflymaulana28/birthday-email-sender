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
require('dotenv').config();
const app = (0, express_1.default)();
const port = 9000;
app.use(express_1.default.json());
app.use(user_1.default);
app.get("/", (req, res) => {
    res.send("Hello, Express with TypeScript and TypeORM!");
});
node_cron_1.default.schedule('* * * * * *', async () => {
    (0, send_birthday_1.sendBirthdayMessages)(await User_1.User.find());
});
(0, typeorm_1.createConnection)()
    .then(async (connection) => {
    console.log("Connected to the database");
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})
    .catch((error) => console.error("Error connecting to the database:", error));
