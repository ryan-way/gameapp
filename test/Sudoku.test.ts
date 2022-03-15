/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import { Sudoku as Entity } from '../src/data/sudoku';
import testdata from '../src/main/testdata';
import { mock, instance, when, anything } from 'ts-mockito';
import { SudokuRepository } from '../src/repository/sudoku';
import Sudoku from '../src/sudoku/Sudoku.svelte';
import { fireEvent } from '@testing-library/dom';
import { Log, setLogger } from '../src/renderer/logging';

beforeAll(() => {
  const mockedLog = mock(Log);
  when(mockedLog.Debug(anything())).thenReturn();
  const logger = instance(mockedLog);
  setLogger(logger);
});

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

test('should solve one', async () => {
  const sudoku = testdata
    .get(Entity.Sudoku.name)
    .map((board, idx) => {
      return { id: idx, board: board } as unknown as Entity.Sudoku;
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
