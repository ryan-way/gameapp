/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { CandidatedCell } from '../../src/ai/candidatedcell';
import { UniqueRegion } from '../../src/ai/techniques';
import { mock, instance, when, anything } from 'ts-mockito';
import type { Cell } from '../../src/dto/cell';
import type { Sudoku } from '../../src/dto/sudoku';
import { Log, setLogger } from '../../src/service/logging';

beforeAll(() => {
  const mockedLog = mock(Log);
  when(mockedLog.Debug(anything())).thenReturn();
  const logger = instance(mockedLog);
  setLogger(logger);
});

describe('Solving', () => {
  const cells: Cell<Sudoku.Value>[] = [
    { Value: ' ' },
    { Value: 1 },
    { Value: 2 },
  ];
  const candidates: Sudoku.Value[] = [1, 2, 3];
  const range = cells.map(
    cell => new CandidatedCell<Sudoku.Value>(cell, ' ', candidates)
  );
  const constraint: UniqueRegion<Sudoku.Value> = new UniqueRegion<Sudoku.Value>(
    range
  );
  test('With Updates Returns True', () => {
    range
      .filter(cell => !cell.IsDefault)
      .forEach(cell => {
        cell.Assign(cell.Value);
      });
    expect(constraint.Solve()).toBeTruthy();
    expect(range[0].IsSolved).toBeTruthy();
  });
  test('With No Updates Returns False', () => {
    expect(constraint.Solve()).toBeFalsy();
  });
});
