import type { Cell } from './cell';

export namespace Data {
  export type Row9<T> = [
    Cell<T>,
    Cell<T>,
    Cell<T>,
    Cell<T>,
    Cell<T>,
    Cell<T>,
    Cell<T>,
    Cell<T>,
    Cell<T>
  ];

  export type Board9x9<T> = [
    Row9<T>,
    Row9<T>,
    Row9<T>,
    Row9<T>,
    Row9<T>,
    Row9<T>,
    Row9<T>,
    Row9<T>,
    Row9<T>
  ];
}
