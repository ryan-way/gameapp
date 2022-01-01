import { contextBridge, ipcRenderer } from 'electron';
import { setTimeout } from 'timers/promises';
import type { ITestEntity } from './ipc/entity/ITestEntity';

contextBridge.exposeInMainWorld('db', {
  getTestEntities: (): Promise<ITestEntity[]> => {
    return ipcRenderer.invoke('getTestEntities');
  },
});
