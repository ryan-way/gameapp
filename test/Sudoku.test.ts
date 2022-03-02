/**
 * @jest-environment jsdom
 */

import { getByText, render } from '@testing-library/svelte';
import { Sudoku as Entity } from '../src/data/sudoku';
import testdata from '../src/main/testdata';
import { mock, instance, when } from 'ts-mockito';
import { SudokuRepository } from '../src/repository/sudoku';
import Sudoku from '../src/sudoku/Sudoku.svelte';
import { fireEvent } from '@testing-library/dom';

test('should render Sudoku', () => {
  const sudoku = testdata
    .get(Entity.Sudoku.name)
    .map((board, idx) => {
      return { id: idx, board: board } as unknown as Entity.Sudoku;
    })
    .at(0);
  const list = sudoku.board.flat().map(cell => cell.Value);
  const values = new Set<Entity.Value>(list);
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

test('should show error', () => {
  const mockedRepo = mock(SudokuRepository);
  when(mockedRepo.GetOne(1)).thenReject(new Error('Test Error'));
  const results = render(Sudoku, { repo: instance(mockedRepo), id: 1 });
  expect(() => results.findAllByText('Test Error')).not.toThrow();
});

test('should solve one', async () => {
  const sudoku = testdata
    .get(Entity.Sudoku.name)
    .map((board, idx) => {
      return { id: idx, board: board } as unknown as Entity.Sudoku;
    })
    .at(0);
  const mockedRepo = mock(SudokuRepository);
  when(mockedRepo.GetOne(1)).thenResolve(sudoku);
  const { findAllByText, getByText } = render(Sudoku, {
    repo: instance(mockedRepo),
    id: 1,
  });
  const { length } = await findAllByText('', { selector: 'td' });
  const button = getByText('Solve');
  await fireEvent.click(button);
  const cells = await findAllByText('', { selector: 'td' });

  expect(cells.length).toBe(length - 1);
});
