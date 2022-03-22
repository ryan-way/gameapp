import { ipcRenderer } from 'electron';
import type { Channel } from '../ipc/channels';
import type { IpcRequest } from '../ipc/ipcrequest';
import type { IIpcService } from '../ipc/ipcservice';

export class IpcService implements IIpcService {
  send(channel: Channel, request: IpcRequest): Promise<any> {
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
