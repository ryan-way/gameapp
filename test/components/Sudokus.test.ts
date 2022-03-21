/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/svelte';
import Sudokus from '../../src/components/Sudokus.svelte';
import testdata from '../../src/main/testdata';
import { mock, instance, when } from 'ts-mockito';
import { Sudoku } from '../../src/data/sudoku';
import { SudokuRepository } from '../../src/repository/sudoku';

test('should render Sudokus', () => {
  const sudokus = testdata.get(Sudoku.Sudoku.name).map((board, idx) => {
    return { id: idx, board: board } as unknown as Sudoku.Sudoku;
  });
  const mockedRepo = mock(SudokuRepository);
  when(mockedRepo.GetAll()).thenResolve(sudokus);
  const results = render(Sudokus, { repo: instance(mockedRepo) });
  for (let i = 1; i <= sudokus.length; i++) {
    expect(() => results.findByText(1)).not.toThrow();
  }
});
