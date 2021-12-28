import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  doThing: () => {
    return ipcRenderer.sendSync('do-a-thing');
  },
});
