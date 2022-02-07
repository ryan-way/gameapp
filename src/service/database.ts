import type { Sudoku } from '../data/sudoku';
import type { Test } from '../data/test';

export interface IDatabase {
  getTestEntities(): Promise<Test.Test[]>;
  getTestEntity(id: number): Promise<Test.Test>;
  getSudokuEntities(): Promise<Sudoku.Sudoku[]>;
  getSudokuEntity(id: number): Promise<Sudoku.Sudoku>;
}

export const key: string = 'db';
