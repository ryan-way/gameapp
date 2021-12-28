import { contextBridge, ipcRenderer } from 'electron';

console.log('Hello from the preload side');
contextBridge.exposeInMainWorld('electron', {
  doThing: () => {
    return ipcRenderer.sendSync('do-a-thing');
  },
});
