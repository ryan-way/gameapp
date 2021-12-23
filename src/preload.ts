import { contextBridge, ipcRenderer } from 'electron';

console.log("Hello from the preload side")
contextBridge.exposeInMainWorld('electron', {
  doThing: () => ipcRenderer.send('do-a-thing'),
});
