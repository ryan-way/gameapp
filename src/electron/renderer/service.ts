import type { IIpcService } from '../ipc/ipcservice';

export interface Window {
  ipc: IIpcService;
}

const { ipc } = window as unknown as Window;
export { ipc };
