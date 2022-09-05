import { Sudoku } from '../dto/sudoku';
import { RepositoryBase } from './repositorybase';

export class SudokuRepository extends RepositoryBase<Sudoku> {
  constructor() {
    super(Sudoku);
  }
}
