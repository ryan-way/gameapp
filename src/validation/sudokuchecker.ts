import { CandidatedCell } from '../ai/candidatedcell';
import type { Cell } from '../data/cell';
import type { Sudoku } from '../data/sudoku';
import { UniqueValues } from './rules';

export class SudokuChecker {
  private board: CandidatedCell<Sudoku.Value>[][];
  private regions: CandidatedCell<Sudoku.Value>[][];
  private validators: UniqueValues<Sudoku.Value>[];
  constructor(board: Cell<Sudoku.Value>[][]) {
    this.SetupBoard(board);
    this.SetupRegions();
    this.SetupValidators();
  }

  SetupBoard(board: Cell<Sudoku.Value>[][]) {
    const domain: Sudoku.Value[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.board = board.map(row =>
      row.map(cell => new CandidatedCell(cell, ' ', domain))
    );
  }

  SetupRegions() {
    this.regions = [...this.board];
    for (let i = 0; i < this.board[0].length; i++) {
      this.regions.push(this.board.map(row => row[i]));
    }

    for (let i = 0; i < 9; i++) {
      const row: number = Math.floor(i / 3) * 3;
      const column: number = (i % 3) * 3;
      this.regions.push(
        this.board
          .slice(row, row + 3)
          .map(row => row.slice(column, column + 3))
          .flat()
      );
    }
  }

  SetupValidators() {
    this.validators = this.regions.map(region => new UniqueValues(region));
  }

  Check(): boolean {
    return this.validators.every(validator => validator.Check());
  }
}
