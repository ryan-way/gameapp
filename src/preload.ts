import { contextBridge, ipcRenderer } from 'electron';
import type { ITestEntity } from './ipc/entity/ITestEntity';

contextBridge.exposeInMainWorld('db', {
  getTestEntities: (): ITestEntity[] => {
    return ipcRenderer.sendSync('getTestEntities');
  },
});
