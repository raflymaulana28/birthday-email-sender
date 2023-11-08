"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogController = void 0;
const appDataSource_1 = require("../config/appDataSource");
const Log_1 = require("../entities/Log");
class LogController {
    async createLog(req, res) {
        const logRepository = appDataSource_1.appDataSource.getRepository(Log_1.Log);
        const { message, status } = req.body;
        const log = new Log_1.Log();
        log.message = message;
        log.status = status;
        await logRepository.save(log);
        res.json(log);
    }
    async getLogs(req, res) {
        const logRepository = appDataSource_1.appDataSource.getRepository(Log_1.Log);
        const logs = await logRepository.find();
        res.json(logs);
    }
}
exports.LogController = LogController;
