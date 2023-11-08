"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const log_1 = require("../controllers/log");
const router = (0, express_1.Router)();
const logController = new log_1.LogController();
router.post('/log', logController.createLog.bind(logController));
router.get('/log', logController.getLogs.bind(logController));
exports.default = router;
