// / <reference path="database.ts" />
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import type { Test } from '../../entity/Test';

export namespace Entities {
  /**
   * Converts data from databse to TestBoard
   * @param {string[]} data - data from databse
   * @return {Test.Board} - resulting test board object
   */
  function from(data: string[]): Test.Board {
    const ret: Test.Board = [
      [{ Value: ' ' }, { Value: ' ' }, { Value: ' ' }],
      [{ Value: ' ' }, { Value: ' ' }, { Value: ' ' }],
      [{ Value: ' ' }, { Value: ' ' }, { Value: ' ' }],
    ];
    data.forEach((item: string, index: number) => {
      ret[Math.floor(index / 3)][index % 3].Value = item as Test.Value;
    });
    return ret;
  }

  /**
   * Converts Testboard for insertion into database
   * TypeOrm converts it properly automatically. Do nothing here
   * @param {TestBoard} data - data from databse
   * @return {TestBoard} - resulting test board object
   */
  function to(data: Test.Board): string[] {
    return data.flat().map(obj => obj.Value.toString());
  }

  @Entity()
  export class Test implements Test.Test {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
      type: 'simple-array',
      transformer: {
        from: from,
        to: to,
      },
    })
    public board: Test.Board;
  }
}
