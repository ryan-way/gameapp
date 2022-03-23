import { Channel } from '../electron/ipc/channels';
import type { IpcRequest } from '../electron/ipc/ipcrequest';
import { ipc } from '../electron/renderer/service';

export class Log {
  private sendChannel: Channel = Channel.Log;

  private send(request: IpcRequest): void {
    ipc.send(this.sendChannel, request);
  }

  Success(message: any): void {
    const request = {
      responseChannel: Channel.None,
      params: ['success', message.toString()],
    };
    this.send(request);
  }

  Debug(message: any): void {
    const request = {
      responseChannel: Channel.None,
      params: ['debug', message.toString()],
    };
    this.send(request);
  }

  Info(message: any): void {
    const request = {
      responseChannel: Channel.None,
      params: ['info', message.toString()],
    };
    this.send(request);
  }

  Warn(message: any): void {
    const request = {
      responseChannel: Channel.None,
      params: ['warn', message.toString()],
    };
    this.send(request);
  }

  Error(message: any): void {
    const request = {
      responseChannel: Channel.None,
      params: ['error', message.toString()],
    };
    this.send(request);
  }

  Failed(message: any): void {
    const request = {
      responseChannel: Channel.None,
      params: ['failed', message.toString()],
    };
    this.send(request);
  }

  Fatal(message: any): void {
    const request = {
      responseChannel: Channel.None,
      params: ['fatal', message.toString()],
    };
    this.send(request);
  }
}

const log = new Log();
// export function setLogger(newLog: Log) {
//   instance = newLog;
// }

export default log;
