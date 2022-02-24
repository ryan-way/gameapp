import type { IIpcService } from '../ipc/IpcService';

export interface Window {
  ipc: IIpcService;
}
