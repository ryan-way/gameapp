// / <reference path="database.ts" />
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Test as Base } from '../../../data/test';

export namespace Entities {
  /**
   * Converts data from databse to TestBoard
   * @param {string[]} data - data from databse
   * @return {Test.Board} - resulting test board object
   */
  function from(data: string[]): Base.Board {
    const ret: Base.Board = [
      [{ Value: ' ' }, { Value: ' ' }, { Value: ' ' }],
      [{ Value: ' ' }, { Value: ' ' }, { Value: ' ' }],
      [{ Value: ' ' }, { Value: ' ' }, { Value: ' ' }],
    ];
    data.forEach((item: string, index: number) => {
      ret[Math.floor(index / 3)][index % 3].Value = item as Base.Value;
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
  export class Test extends Base.Test {
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
