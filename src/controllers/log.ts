import { Request, Response } from "express";
import { appDataSource } from "../config/appDataSource";
import { Log } from "../entities/Log";

export class LogController {
  async createLog(req: Request, res: Response): Promise<void> {
    const logRepository = appDataSource.getRepository(Log);
    const { message, status } = req.body;
    const log = new Log();
    log.message = message;
	log.status = status;
    await logRepository.save(log);
    res.json(log);
  }
  async getLogs(req: Request, res: Response) {
    const logRepository =appDataSource.getRepository(Log);
    const logs = await logRepository.find();
    res.json(logs);
  }
}
