import type { IIpcService } from '../ipc/IpcService';

export interface Window {
  ipc: IIpcService;
}

const { ipc } = window as unknown as Window;
export { ipc };
