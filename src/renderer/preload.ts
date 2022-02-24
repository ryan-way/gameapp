import { contextBridge } from 'electron';
import ipc from './IpcService';

contextBridge.exposeInMainWorld('ipc', {
  send: ipc.send.bind(ipc),
});
