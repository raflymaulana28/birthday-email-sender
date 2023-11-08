"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogService = void 0;
const appDataSource_1 = require("../config/appDataSource");
const Log_1 = require("../entities/Log");
class LogService {
    async createLog(data) {
        const logRepository = appDataSource_1.appDataSource.getRepository(Log_1.Log);
        const { message, status } = data;
        const log = new Log_1.Log();
        log.message = message;
        log.status = status;
        await logRepository.save(log);
    }
}
exports.LogService = LogService;
