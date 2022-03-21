import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import type { Cell } from '../../../dto/cell';
import { Value, Row, Board, Sudoku as Base } from '../../../dto/sudoku';

export namespace Entities {
  function defaultCell(): Cell<Value> {
    return { Value: ' ' };
  }

  function defaultRow(): Row {
    return [
      defaultCell(),
      defaultCell(),
      defaultCell(),
      defaultCell(),
      defaultCell(),
      defaultCell(),
      defaultCell(),
      defaultCell(),
      defaultCell(),
    ];
  }

  function defaultBoard(): Board {
    return [
      defaultRow(),
      defaultRow(),
      defaultRow(),
      defaultRow(),
      defaultRow(),
      defaultRow(),
      defaultRow(),
      defaultRow(),
      defaultRow(),
    ];
  }

  /**
   * Converts data from databse to TestBoard
   * @param {string[]} data - data from databse
   * @return {TestBoard} - resulting test board object
   */
  function from(data: string[]): Board {
    const ret: Board = defaultBoard();
    data.forEach((item: string, index: number) => {
      ret[Math.floor(index / 9)][index % 9].Value = (
        item == ' ' ? item : +item
      ) as Value;
    });
    return ret;
  }

  /**
   * Converts Testboard for insertion into database
   * TypeOrm converts it properly automatically. Do nothing here
   * @param {TestBoard} data - data from databse
   * @return {TestBoard} - resulting test board object
   */

  function to(data: Board): string[] {
    return data.flat().map(obj => obj.Value.toString());
  }

  @Entity()
  export class Sudoku extends Base {
    constructor() {
      super();
    }

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
      type: 'simple-array',
      transformer: {
        from: from,
        to: to,
      },
    })
    public board: Board;
  }
}
