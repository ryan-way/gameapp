/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/svelte';
import Sudokus from '../sudoku/Sudokus.svelte';
import testdata from '../main/testdata';
import { overrides } from '../service';
import { mock, instance, when } from 'ts-mockito';
import type { IDatabase, IRepository } from '../service/database';
import { Sudoku, instance as inst } from '../data/sudoku';

const sudokus = testdata.get(Sudoku.Sudoku.name).map((board, idx) => {
  return { id: idx, board: board } as unknown as Sudoku.Sudoku;
});

const promise = Promise.resolve(sudokus);

const mockedRepo: IRepository<Sudoku.Sudoku> =
  mock<IRepository<Sudoku.Sudoku>>();
when(mockedRepo.GetAll()).thenReturn(promise);
const repo: IRepository<Sudoku.Sudoku> = instance(mockedRepo);

const mockedData: IDatabase = mock<IDatabase>();
when(mockedData.GetRepository<Sudoku.Sudoku>(inst)).thenReturn(repo);
const data: IDatabase = instance(mockedData);
overrides.data.set(data);

const results = render(Sudokus);

test('should render Sudoku', () => {
  for (let i = 1; i <= sudokus.length; i++) {
    expect(() => results.findByText(1)).not.toThrow();
  }
});
