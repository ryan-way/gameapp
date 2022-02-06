import type { Cell } from './Cell';

export type SValue = ' ' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type SudokuRow = [
  Cell<SValue>,
  Cell<SValue>,
  Cell<SValue>,
  Cell<SValue>,
  Cell<SValue>,
  Cell<SValue>,
  Cell<SValue>,
  Cell<SValue>,
  Cell<SValue>
];

export type SudokuBoard = [
  SudokuRow,
  SudokuRow,
  SudokuRow,
  SudokuRow,
  SudokuRow,
  SudokuRow,
  SudokuRow,
  SudokuRow,
  SudokuRow
];

export interface ISudokuEntity {
  id: number;
  board: SudokuBoard;
}
