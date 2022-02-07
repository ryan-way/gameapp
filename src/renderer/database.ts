import { ipcRenderer, contextBridge } from 'electron';
import type { Sudoku } from '../data/sudoku';
import type { Test } from '../data/test';
import type { IDatabase } from '../service/database';

export class Database implements IDatabase {
  public static db: IDatabase;
  getTestEntities(): Promise<Test.Test[]> {
    return ipcRenderer.invoke('getAllTest');
  }

  getTestEntity(id: number): Promise<Test.Test> {
    return ipcRenderer.invoke('getOneTest', id);
  }

  getSudokuEntities(): Promise<Sudoku.Sudoku[]> {
    return ipcRenderer.invoke('getAllSudoku');
  }

  getSudokuEntity(id: number): Promise<Sudoku.Sudoku> {
    return ipcRenderer.invoke('getOneSudoku', id);
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
