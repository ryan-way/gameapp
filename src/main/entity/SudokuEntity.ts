
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import type { Cell } from '../../entity/Cell';
import type { Sudoku } from '../../entity/Sudoku';

export namespace Entities {
  function defaultCell(): Cell<Sudoku.Value> {
    return { Value: ' ' };
  }

  function defaultRow(): Sudoku.Row {
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

  function defaultBoard(): Sudoku.Board {
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
  function from(data: string[]): Sudoku.Board {
    const ret: Sudoku.Board = defaultBoard();
    data.forEach((item: string, index: number) => {
      ret[Math.floor(index / 9)][index % 9].Value = (
        item == ' ' ? item : +item
      ) as Sudoku.Value;
    });
    return ret;
  }

  /**
   * Converts Testboard for insertion into database
   * TypeOrm converts it properly automatically. Do nothing here
   * @param {TestBoard} data - data from databse
   * @return {TestBoard} - resulting test board object
   */

  function to(data: Sudoku.Board): string[] {
    return data.flat().map(obj => obj.Value.toString());
  }

  @Entity()
  export class Sudoku implements Sudoku.Sudoku {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
      type: 'simple-array',
      transformer: {
        from: from,
        to: to,
      },
    })
    public board: Sudoku.Board;
  }
}
