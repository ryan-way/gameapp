import { LogChannel } from '../ipc/Channels';
import type { IpcRequest } from '../ipc/IpcRequest';
import { ipc } from './service';

export class Log {
  private sendChannel: string = LogChannel;

  private send(request: IpcRequest): void {
    ipc.send(this.sendChannel, request);
  }

  Success(message: any): void {
    const request = {
      responseChannel: '',
      params: ['success', message.toString()],
    };
    this.send(request);
  }

  Debug(message: any): void {
    const request = {
      responseChannel: '',
      params: ['debug', message.toString()],
    };
    this.send(request);
  }

  Info(message: any): void {
    const request = {
      responseChannel: '',
      params: ['info', message.toString()],
    };
    this.send(request);
  }

  Warn(message: any): void {
    const request = {
      responseChannel: '',
      params: ['warn', message.toString()],
    };
    this.send(request);
  }

  Error(message: any): void {
    const request = {
      responseChannel: '',
      params: ['error', message.toString()],
    };
    this.send(request);
  }

  Failed(message: any): void {
    const request = {
      responseChannel: '',
      params: ['failed', message.toString()],
    };
    this.send(request);
  }

  Fatal(message: any): void {
    const request = {
      responseChannel: '',
      params: ['fatal', message.toString()],
    };
    this.send(request);
  }
}

let instance = new Log();
export function setLogger(newLog: Log) {
  instance = newLog;
}

export default function log() {
  return instance;
}
