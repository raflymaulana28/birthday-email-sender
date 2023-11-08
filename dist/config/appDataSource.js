"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
const Log_1 = require("../entities/Log");
require("dotenv").config();
exports.appDataSource = new typeorm_1.DataSource({
    name: "default",
    type: "mongodb",
    url: process.env.MONGO_URL,
    entities: [User_1.User, Log_1.Log],
    synchronize: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
