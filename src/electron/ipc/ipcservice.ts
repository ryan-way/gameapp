import type { IpcRequest } from './ipcrequest';

export interface IIpcService {
  send(channel: string, request: IpcRequest): Promise<any>;
}
