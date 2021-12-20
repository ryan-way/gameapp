import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TicTacToe {
  @PrimaryGeneratedColumn()
  id: number;
}
