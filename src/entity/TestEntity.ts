import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TestEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('simple-array')
  board: [
    [string, string, string],
    [string, string, string],
    [string, string, string]
  ];
}
