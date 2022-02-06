import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import type { ITestEntity, TestBoard, TBValue } from '../../entity/ITestEntity';

/**
 * Converts data from databse to TestBoard
 * @param {string[]} data - data from databse
 * @return {TestBoard} - resulting test board object
 */
function from(data: string[]): TestBoard {
  const ret: TestBoard = [
    [{ Value: ' ' }, { Value: ' ' }, { Value: ' ' }],
    [{ Value: ' ' }, { Value: ' ' }, { Value: ' ' }],
    [{ Value: ' ' }, { Value: ' ' }, { Value: ' ' }],
  ];
  data.forEach((item: string, index: number) => {
    ret[Math.floor(index / 3)][index % 3].Value = item as TBValue;
  });
  return ret;
}

/**
 * Converts Testboard for insertion into database
 * TypeOrm converts it properly automatically. Do nothing here
 * @param {TestBoard} data - data from databse
 * @return {TestBoard} - resulting test board object
 */
function to(data: TestBoard): string[] {
  return data.flat().map(obj => obj.Value.toString());
}

@Entity()
export class TestEntity implements ITestEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    type: 'simple-array',
    transformer: {
      from: from,
      to: to,
    },
  })
  public board: TestBoard;
}
