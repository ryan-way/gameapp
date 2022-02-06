import { ipcRenderer, contextBridge } from 'electron';
import type { ISudokuEntity } from '../entity/ISudokuEntity';
import type { ITestEntity } from '../entity/ITestEntity';
import type { IDatabase } from '../service/database';

export class Database implements IDatabase {
  public static db: IDatabase;
  getTestEntities(): Promise<ITestEntity[]> {
    return ipcRenderer.invoke('getAllTestEntity');
  }

  getTestEntity(id: number): Promise<ITestEntity> {
    return ipcRenderer.invoke('getOneTestEntity', id);
  }

  getSudokuEntities(): Promise<ISudokuEntity[]> {
    return ipcRenderer.invoke('getAllSudokuEntity');
  }

  getSudokuEntity(id: number): Promise<ISudokuEntity> {
    return ipcRenderer.invoke('getOneSudokuEntity', id);
  }
}

export function InitializeDatabase() {
  Database.db = new Database();
  contextBridge.exposeInMainWorld('db', {
    getTestEntities: Database.db.getTestEntities.bind(this),
    getTestEntity: Database.db.getTestEntity.bind(this),
    getSudokuEntities: Database.db.getSudokuEntities.bind(this),
    getSudokuEntity: Database.db.getSudokuEntity.bind(this),
  });
}
