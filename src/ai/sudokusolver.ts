import type { Cell } from '../data/cell';
import { UniqueConstraint } from './constraint';
import { DomainedCell } from './domainedcell';

export class SudokuSolver {
  board: DomainedCell[][];
  constraints: UniqueConstraint[];
  domain: Set<any>;
  blank: any;

  constructor(board: Cell<any>[][]) {
    this.domain = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    this.board = board.map(row =>
      row.map(cell => new DomainedCell(cell, this.domain, ' '))
    );
    this.constraints = [];
    this.blank = ' ';
    this.SetupContraints();
  }

  SetupContraints(): void {
    for (const row of this.board) {
      this.constraints.push(new UniqueConstraint(row, this.domain, this.blank));
    }

    for (let i = 0; i < this.board[0].length; i++) {
      const column: DomainedCell[] = this.board.map(row => row[0]);
      this.constraints.push(
        new UniqueConstraint(column, this.domain, this.blank)
      );
    }

    for (let i = 0; i < 9; i++) {
      const row: number = Math.floor(i / 3) * 3;
      const column: number = (i % 3) * 3;
      const subGrid: DomainedCell[] = this.board
        .slice(row, row + 3)
        .map(row => row.slice(column, column + 3))
        .flat();

      this.constraints.push(
        new UniqueConstraint(subGrid, this.domain, this.blank)
      );
    }
  }

  SolveOne(): boolean {
    for (const constraint of this.constraints) {
      if (constraint.SolveOne()) {
        console.log(constraint.Range);
        return true;
      }
    }
  }
}
