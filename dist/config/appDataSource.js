"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
const Log_1 = require("../entities/Log");
exports.appDataSource = new typeorm_1.DataSource({
    name: "default",
    type: "mongodb",
    url: "mongodb://murahYohAyok55:persib123@cluster0-shard-00-00.2vhgo.mongodb.net:27017,cluster0-shard-00-01.2vhgo.mongodb.net:27017,cluster0-shard-00-02.2vhgo.mongodb.net:27017/?ssl=true&replicaSet=atlas-zowunz-shard-0&authSource=admin&retryWrites=true&w=majority",
    entities: [User_1.User, Log_1.Log],
    synchronize: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
