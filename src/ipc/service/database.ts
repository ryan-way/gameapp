import type { ISudokuEntity } from '../entity/ISudokuEntity';
import type { ITestEntity } from '../entity/ITestEntity';

export interface IDatabase {
  getTestEntities(): Promise<ITestEntity[]>;
  getTestEntity(id: number): Promise<ITestEntity>;
  getSudokuEntities(): Promise<ISudokuEntity[]>;
  getSudokuEntity(id: number): Promise<ISudokuEntity>;
}

export const key: string = 'db';
