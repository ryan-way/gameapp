import { ipcRenderer, contextBridge } from 'electron';
import type { IDatabase } from '../service/database';

export class Database implements IDatabase {
  public static db: IDatabase;
  entities: Function[];

  GetRepository<T>(func: new () => T) {
    return {
      GetOne: (id: number): Promise<T> => {
        return ipcRenderer.invoke('getOne' + func.name, id);
      },
      GetAll: (): Promise<T[]> => {
        return ipcRenderer.invoke('getAll' + func.name);
      },
    };
  }
}

export function InitializeDatabase() {
  Database.db = new Database();
  contextBridge.exposeInMainWorld('data', {
    GetRepository: Database.db.GetRepository.bind(this),
  });
}
