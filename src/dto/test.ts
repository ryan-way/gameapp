import type { Cell } from './cell';
import { EntityBase } from './entitybase';

export const enum Value {
  Empty = ' ',
  X = 'X',
  O = 'O',
}

export type Row = [Cell<Value>, Cell<Value>, Cell<Value>];

export type Board = [Row, Row, Row];

export class Test extends EntityBase {
  private value: Value;
  constructor() {
    super();
  }

  board: Board;
}
