import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import type { ITestEntity } from '../ipc/entity/ITestEntity';

type Value = ' ' | 'X' | 'O';

type TestBoard = [
  [Value, Value, Value],
  [Value, Value, Value],
  [Value, Value, Value]
];

function from(data): any {
  var ret: TestBoard = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' '],
  ];
  data.forEach((item: string, index: number) => {
    ret[Math.floor(index / 3)][index % 3] = item as Value;
  });
  return ret;
}

function to(data): any {
  return data;
}

@Entity()
export class TestEntity implements ITestEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'simple-array',
    transformer: {
      from: from,
      to: to,
    },
  })
  board: TestBoard;
}
