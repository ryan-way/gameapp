import type { IpcRequest } from './IpcRequest';

export interface IIpcService {
  send(channel: string, request: IpcRequest): Promise<any>;
}
