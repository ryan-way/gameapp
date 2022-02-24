import { ipcRenderer } from 'electron';
import type { IpcRequest } from '../ipc/IpcRequest';
import type { IIpcService } from '../ipc/IpcService';

export class IpcService implements IIpcService {
  send(channel: string, request: IpcRequest): Promise<any> {
    ipcRenderer.send(channel, request);

    if (request.responseChannel) {
      return new Promise(resolve => {
        ipcRenderer.once(request.responseChannel, (_event, response) =>
          resolve(response)
        );
      });
    }

    return new Promise(resolve => {
      resolve({});
    });
  }
}

const ipc = new IpcService();
export default ipc;
