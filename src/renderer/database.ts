import { ipcRenderer, contextBridge } from 'electron';
import type { ITestEntity } from '../ipc/entity/ITestEntity';
import type { IDatabase } from '../ipc/service/database';

export class Database implements IDatabase {
  public static db: IDatabase;
  getTestEntities(): Promise<ITestEntity[]> {
    return ipcRenderer.invoke('getTestEntities');
  }
}

export function InitializeDatabase() {
  Database.db = new Database();
  contextBridge.exposeInMainWorld('db', {
    getTestEntities: Database.db.getTestEntities.bind(this),
  });
}
