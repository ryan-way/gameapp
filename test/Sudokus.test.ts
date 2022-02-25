/**
 * @jest-environment jsdom
 */

import { render, RenderResult } from '@testing-library/svelte';
import Sudokus from '../src/sudoku/Sudokus.svelte';
import testdata from '../src/main/testdata';
import { mock, instance, when } from 'ts-mockito';
import { Sudoku } from '../src/data/sudoku';
import { SudokuRepository } from '../src/repository/sudoku';

let results: RenderResult;
let testResolve: (reason?: any) => void;
let testReject: (reason?: any) => void;

beforeEach(() => {
  const promise = new Promise<Sudoku.Sudoku[]>((resolve, reject) => {
    testResolve = resolve;
    testReject = reject;
  });
  const mockedRepo = mock(SudokuRepository);
  when(mockedRepo.GetAll()).thenReturn(promise);
  results = render(Sudokus, { repo: instance(mockedRepo) });
});

test('should render Sudokus', () => {
  const sudokus = testdata.get(Sudoku.Sudoku.name).map((board, idx) => {
    return { id: idx, board: board } as unknown as Sudoku.Sudoku;
  });
  testResolve(sudokus);
  for (let i = 1; i <= sudokus.length; i++) {
    expect(() => results.findByText(1)).not.toThrow();
  }
});

test('should render Error', () => {
  testReject(new Error('Test Error'));
  expect(() => results.findAllByText('Test Error'));
});
