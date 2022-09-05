/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import { Sudoku as Dto, Value } from '../../src/dto/sudoku';
import testdata from '../../src/electron/main/testdata';
import { mock, instance, when, anything } from 'ts-mockito';
import { SudokuRepository } from '../../src/repository/sudoku';
import Sudoku from '../../src/components/Sudoku.svelte';
import { fireEvent } from '@testing-library/dom';

test('should render Sudoku', () => {
  const sudoku = testdata
    .get(Dto.name)
    .map((board, idx) => {
      return { id: idx, board: board } as unknown as Dto;
    })
    .at(0);
  const list = sudoku.board.flat().map(cell => cell.Value);
  const values = new Set<Value>(list);
  const mockedRepo = mock(SudokuRepository);
  when(mockedRepo.GetOne(1)).thenResolve(sudoku);
  const results = render(Sudoku, { repo: instance(mockedRepo), id: 1 });
  expect(() => {
    values.forEach(value => {
      results.findAllByAltText(value).then(items => {
        expect(items).toHaveLength(list.filter(x => x == value).length);
      });
    });
  }).not.toThrow();
});

test('should solve one', async () => {
  const sudoku = testdata
    .get(Dto.name)
    .map((board, idx) => {
      return { id: idx, board: board } as unknown as Dto;
    })
    .at(0);
  const mockedRepo = mock(SudokuRepository);
  when(mockedRepo.GetOne(1)).thenResolve(sudoku);
  const { getByText, findByTestId } = render(Sudoku, {
    repo: instance(mockedRepo),
    id: 1,
  });
  const cell = await findByTestId('Board66');
  const solve = getByText('Solve');
  await fireEvent.click(solve);
  expect(cell).toHaveTextContent('4');
});
