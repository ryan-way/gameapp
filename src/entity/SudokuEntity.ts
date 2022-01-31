import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import type {
  ISudokuEntity,
  SudokuBoard,
  SValue,
} from '../ipc/entity/ISudokuEntity';

/**
 * Converts data from databse to TestBoard
 * @param {string[]} data - data from databse
 * @return {TestBoard} - resulting test board object
 */
function from(data: string[]): SudokuBoard {
  const ret: SudokuBoard = [
    [
      { Value: ' ' }, { Value: ' ' }, { Value: ' ' },
      { Value: ' ' }, { Value: ' ' }, { Value: ' ' },
      { Value: ' ' }, { Value: ' ' }, { Value: ' ' },
    ],
    [
      { Value: ' ' }, { Value: ' ' }, { Value: ' ' },
      { Value: ' ' }, { Value: ' ' }, { Value: ' ' },
      { Value: ' ' }, { Value: ' ' }, { Value: ' ' },
    ],
    [
      { Value: ' ' }, { Value: ' ' }, { Value: ' ' },
      { Value: ' ' }, { Value: ' ' }, { Value: ' ' },
      { Value: ' ' }, { Value: ' ' }, { Value: ' ' },
    ],
    [
      { Value: ' ' }, { Value: ' ' }, { Value: ' ' },
      { Value: ' ' }, { Value: ' ' }, { Value: ' ' },
      { Value: ' ' }, { Value: ' ' }, { Value: ' ' },
    ],
    [
      { Value: ' ' }, { Value: ' ' }, { Value: ' ' },
      { Value: ' ' }, { Value: ' ' }, { Value: ' ' },
      { Value: ' ' }, { Value: ' ' }, { Value: ' ' },
    ],
    [
      { Value: ' ' }, { Value: ' ' }, { Value: ' ' },
      { Value: ' ' }, { Value: ' ' }, { Value: ' ' },
      { Value: ' ' }, { Value: ' ' }, { Value: ' ' },
    ],
    [
      { Value: ' ' }, { Value: ' ' }, { Value: ' ' },
      { Value: ' ' }, { Value: ' ' }, { Value: ' ' },
      { Value: ' ' }, { Value: ' ' }, { Value: ' ' },
    ],
    [
      { Value: ' ' }, { Value: ' ' }, { Value: ' ' },
      { Value: ' ' }, { Value: ' ' }, { Value: ' ' },
      { Value: ' ' }, { Value: ' ' }, { Value: ' ' },
    ],
    [
      { Value: ' ' }, { Value: ' ' }, { Value: ' ' },
      { Value: ' ' }, { Value: ' ' }, { Value: ' ' },
      { Value: ' ' }, { Value: ' ' }, { Value: ' ' },
    ],
  ];
  data.forEach((item: string, index: number) => {
    ret[Math.floor(index / 9)][index % 9].Value = item as SValue;
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
