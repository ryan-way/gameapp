import type { Cell } from './Cell';

export type TBValue = ' ' | 'X' | 'O';

export type TBRow = [Cell<TBValue>, Cell<TBValue>, Cell<TBValue>];

export type TestBoard = [TBRow, TBRow, TBRow];

export interface ITestEntity {
  id: number;
  board: TestBoard;
}
