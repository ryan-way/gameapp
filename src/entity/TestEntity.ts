import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import type { ITestEntity } from '../ipc/entity/ITestEntity';

@Entity()
export class TestEntity implements ITestEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('simple-array')
  board: [
    [string, string, string],
    [string, string, string],
    [string, string, string]
  ];
}
