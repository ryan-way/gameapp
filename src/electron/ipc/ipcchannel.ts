import type { IpcMainEvent } from 'electron';
import type { IpcRequest } from './ipcrequest';

export interface IpcChannel {
  getName(): string;
  handle(event: IpcMainEvent, request: IpcRequest): void;
}
