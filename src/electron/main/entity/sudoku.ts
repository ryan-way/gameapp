import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import type { Cell } from '../../../data/cell';
import { Sudoku as Base } from '../../../data/sudoku';

export namespace Entities {
  function defaultCell(): Cell<Base.Value> {
    return { Value: ' ' };
  }

  function defaultRow(): Base.Row {
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

  function defaultBoard(): Base.Board {
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
  function from(data: string[]): Base.Board {
    const ret: Base.Board = defaultBoard();
    data.forEach((item: string, index: number) => {
      ret[Math.floor(index / 9)][index % 9].Value = (
        item == ' ' ? item : +item
      ) as Base.Value;
    });
    return ret;
  }

  /**
   * Converts Testboard for insertion into database
   * TypeOrm converts it properly automatically. Do nothing here
   * @param {TestBoard} data - data from databse
   * @return {TestBoard} - resulting test board object
   */

  function to(data: Base.Board): string[] {
    return data.flat().map(obj => obj.Value.toString());
  }

  @Entity()
  export class Sudoku extends Base.Sudoku {
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
    public board: Base.Board;
  }
}
