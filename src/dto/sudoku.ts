import type { Cell } from './cell';
import { EntityBase } from './entitybase';

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

  export class Sudoku extends EntityBase {
    constructor() {
      super();
    }

    id: number;
    board: Board;
  }
}
