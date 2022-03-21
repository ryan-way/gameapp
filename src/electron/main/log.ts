import type { IpcMainEvent } from 'electron';
import zoya from 'zoya';
import { LogChannel } from '../ipc/channels';
import type { IpcChannel } from '../ipc/ipcchannel';
import type { IpcRequest } from '../ipc/ipcrequest';

export namespace Main {
  export class Log implements IpcChannel {
    constructor() {}

    public getName(): string {
      return LogChannel;
    }

    public handle(event: IpcMainEvent, request: IpcRequest): void {
      const [op, message] = request.params;
      if (op == 'success') {
        this.Success(message);
      } else if (op == 'debug') {
        this.Debug(message);
      } else if (op == 'info') {
        this.Info(message);
      } else if (op == 'warn') {
        this.Warn(message);
      } else if (op == 'error') {
        this.Error(message);
      } else if (op == 'failed') {
        this.Failed(message);
      } else if (op == 'fatal') {
        this.Fatal(message);
      } else this.Error('Logger operation not implemented', op);
    }

    public async Success(message: any): Promise<void> {
      zoya.success(message);
    }

    public async Debug(message: any): Promise<void> {
      zoya.debug(message);
    }

    public async Info(message: any): Promise<void> {
      zoya.info(message);
    }

    public async Warn(message: any): Promise<void> {
      zoya.warn(message);
    }

    public async Error(...args): Promise<void> {
      zoya.error(args);
    }

    public async Failed(...args): Promise<void> {
      zoya.failed(args);
    }

    public async Fatal(...args): Promise<void> {
      zoya.fatal(args);
    }
  }
}
const log = new Main.Log();
export default log;
