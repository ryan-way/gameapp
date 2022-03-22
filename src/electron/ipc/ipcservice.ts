import type { Channel } from './channels';
import type { IpcRequest } from './ipcrequest';

export interface IIpcService {
  send(channel: Channel, request: IpcRequest): Promise<any>;
}
