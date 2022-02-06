import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import type { Cell } from '../../entity/Cell';
import type {
  ISudokuEntity,
  SudokuBoard,
  SudokuRow,
  SValue,
} from '../../entity/ISudokuEntity';

function defaultCell(): Cell<SValue> {
  return { Value: ' ' };
}

function defaultRow(): SudokuRow {
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

function defaultBoard(): SudokuBoard {
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
function from(data: string[]): SudokuBoard {
  const ret: SudokuBoard = defaultBoard();
  data.forEach((item: string, index: number) => {
    ret[Math.floor(index / 9)][index % 9].Value = (
      item == ' ' ? item : +item
    ) as SValue;
  });
  return ret;
}

/**
 * Converts Testboard for insertion into database
 * TypeOrm converts it properly automatically. Do nothing here
 * @param {TestBoard} data - data from databse
 * @return {TestBoard} - resulting test board object
 */

function to(data: SudokuBoard): string[] {
  return data.flat().map(obj => obj.Value.toString());
}
export namespace Db {
  @Entity()
  export class SudokuEntity implements ISudokuEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
      type: 'simple-array',
      transformer: {
        from: from,
        to: to,
      },
    })
    public board: SudokuBoard;
  }
}
