import type { Cell } from './cell';
import { EntityBase } from './entitybase';

export namespace Test {
  export type Value = ' ' | 'X' | 'O';

  export type Row = [Cell<Value>, Cell<Value>, Cell<Value>];

  export type Board = [Row, Row, Row];

  export class Test extends EntityBase {
    constructor() {
      super();
    }

    id: number;
    board: Board;
  }
}
