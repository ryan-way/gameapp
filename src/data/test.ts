import type { Cell } from './cell';

export namespace Test {
  export type Value = ' ' | 'X' | 'O';

  export type Row = [Cell<Value>, Cell<Value>, Cell<Value>];

  export type Board = [Row, Row, Row];

  export interface Test {
    id: number;
    board: Board;
  }
}
