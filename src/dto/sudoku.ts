import type { Cell } from './cell';
import { EntityBase } from './entitybase';

export enum Value {
  Empty = ' ',
  One = 1,
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5,
  Six = 6,
  Seven = 7,
  Eight = 8,
  Nine = 9,
}

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

  board: Board;
}
