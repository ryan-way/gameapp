import { Sudoku } from '../data/sudoku';
import { RepositoryBase } from './repositorybase';

export class SudokuRepository extends RepositoryBase<Sudoku.Sudoku> {
  constructor() {
    super(Sudoku.Sudoku);
  }
}
