import type { IpcMainEvent } from 'electron';
import type { Channel } from './channels';
import type { IpcRequest } from './ipcrequest';

export interface IpcChannel {
  getName(): Channel;
  handle(event: IpcMainEvent, request: IpcRequest): void;
}
