import type { Sudoku } from '../entity/Sudoku';
import type { Test } from '../entity/Test';

export interface IDatabase {
  getTestEntities(): Promise<Test.Test[]>;
  getTestEntity(id: number): Promise<Test.Test>;
  getSudokuEntities(): Promise<Sudoku.Sudoku[]>;
  getSudokuEntity(id: number): Promise<Sudoku.Sudoku>;
}

export const key: string = 'db';
