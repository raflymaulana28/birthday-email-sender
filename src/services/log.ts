import { appDataSource } from "../config/appDataSource";
import { Log } from "../entities/Log";

export class LogService {
  async createLog(data: { message: string; status: string }): Promise<void> {
    const logRepository = appDataSource.getRepository(Log);
    const { message, status } = data;
    const log = new Log();
    log.message = message;
    log.status = status;
    await logRepository.save(log);
  }
}
