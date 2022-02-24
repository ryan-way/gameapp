import { Sudoku } from '../data/sudoku';
import { BaseRepository } from '../renderer/database';

export class SudokuRepository extends BaseRepository<Sudoku.Sudoku> {
  constructor() {
    super(Sudoku.Sudoku);
  }
}
