import { contextBridge } from 'electron';
import ipc from './ipc';

contextBridge.exposeInMainWorld('ipc', {
  send: ipc.send.bind(ipc),
});
