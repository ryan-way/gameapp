/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { CandidatedCell } from '../../src/ai/candidatedcell';
import { SinglePosition } from '../../src/ai/techniques';
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
  test('Should Return True With Updates', () => {
    const cells: Cell<Sudoku.Value>[] = [
      { Value: ' ' },
      { Value: 1 },
      { Value: 2 },
    ];
    const candidates: Sudoku.Value[] = [1, 2, 3];
    const range = cells.map(
      cell => new CandidatedCell<Sudoku.Value>(cell, ' ', candidates)
    );
    range
      .filter(cell => !cell.IsDefault)
      .forEach(cell => {
        cell.Assign(cell.Value);
      });
    const technique = new SinglePosition(range);
    expect(technique.Solve()).toBeTruthy();
  });
  test('Should Return False Without Updates', () => {
    const cells: Cell<Sudoku.Value>[] = [
      { Value: 3 },
      { Value: 1 },
      { Value: 2 },
    ];
    const candidates: Sudoku.Value[] = [1, 2, 3];
    const range = cells.map(
      cell => new CandidatedCell<Sudoku.Value>(cell, ' ', candidates)
    );
    range
      .filter(cell => !cell.IsDefault)
      .forEach(cell => {
        cell.Assign(cell.Value);
      });
    const technique = new SinglePosition(range);
    expect(technique.Solve()).toBeFalsy();
  });
  test('Should Return True With Updates', () => {
    const cells: Cell<Sudoku.Value>[] = [
      { Value: ' ' },
      { Value: 1 },
      { Value: 2 },
    ];
    const candidates: Sudoku.Value[] = [1, 2, 3];
    const range = cells.map(
      cell => new CandidatedCell<Sudoku.Value>(cell, ' ', candidates)
    );
    range
      .filter(cell => !cell.IsDefault)
      .forEach(cell => {
        cell.Assign(cell.Value);
      });
    const technique = new SinglePosition(range);
    technique.Solve();
    expect(range[0].IsSolved).toBeTruthy();
  });
  test('Should Return False Without Updates', () => {
    const cells: Cell<Sudoku.Value>[] = [
      { Value: ' ' },
      { Value: ' ' },
      { Value: ' ' },
    ];
    const candidates: Sudoku.Value[] = [1, 2, 3];
    const range = cells.map(
      cell => new CandidatedCell<Sudoku.Value>(cell, ' ', candidates)
    );
    const technique = new SinglePosition(range);
    technique.Solve();
    expect(range[0].IsSolved).toBeFalsy();
  });
});

describe('Regression', () => {
  test('Single position should not assign already is solved', () => {
    const cells: Cell<Sudoku.Value>[] = [
      { Value: ' ' },
      { Value: ' ' },
      { Value: 1 },
      { Value: 2 },
    ];
    const candidates: Sudoku.Value[] = [1, 2, 3];
    const range = cells.map(
      cell => new CandidatedCell<Sudoku.Value>(cell, ' ', candidates)
    );
    range
      .filter(cell => !cell.IsDefault)
      .forEach(cell => {
        cell.Assign(cell.Value);
      });
    range[1].Remove(1);
    const technique = new SinglePosition(range);
    expect(technique.Solve()).toBeFalsy();
    expect(range[0].Value).not.toBe(1);
  });
});
