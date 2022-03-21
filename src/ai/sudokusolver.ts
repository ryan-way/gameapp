import type { Cell } from '../dto/cell';
import type { Value } from '../dto/sudoku';
import { CandidatedCell } from './candidatedcell';
import type { ITechnique } from './techniques';
import { SinglePosition, UniqueRegion } from './techniques';
import { log } from '../service/service';

export class SudokuSolver {
  board: CandidatedCell<Value>[][];
  regions: CandidatedCell<Value>[][];
  domain: Value[];
  techniques: ITechnique[];

  public get Board(): CandidatedCell<Value>[][] {
    return this.board;
  }

  constructor(board: Cell<Value>[][]) {
    this.SetupBoard(board);
    this.SetupRegions();
    this.SetupContraints();
    this.Log();
  }

  SetupBoard(board: Cell<Value>[][]) {
    this.domain = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.board = board.map(row =>
      row.map(cell => new CandidatedCell(cell, ' ', this.domain))
    );
    this.board
      .flat()
      .filter(cell => !cell.IsDefault)
      .forEach(cell => {
        cell.Assign(cell.Value);
      });
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

  SetupContraints() {
    this.techniques = this.regions
      .map(region => new UniqueRegion(region) as ITechnique)
      .concat(this.regions.map(region => new SinglePosition(region)));
  }

  async Solve() {
    while (this.techniques.some(technique => technique.Solve())) {}
    this.Log();
  }

  SolveOne() {
    this.techniques.some(technique => technique.SolveOne());
  }

  Log() {
    log().Info('Sudoku Solver Board State');
    for (const row of this.board) {
      log().Info(`[${row.map(cell => cell.Value).join(',')}]`);
    }
  }
}
