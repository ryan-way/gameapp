import type { Cell } from './Cell';

export namespace Sudoku {
  export type Value = ' ' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

  export type Row = [
    Cell<Value>,
    Cell<Value>,
    Cell<Value>,
    Cell<Value>,
    Cell<Value>,
    Cell<Value>,
    Cell<Value>,
    Cell<Value>,
    Cell<Value>
  ];

  export type Board = [Row, Row, Row, Row, Row, Row, Row, Row, Row];

  export interface Sudoku {
    id: number;
    board: Board;
  }
}
