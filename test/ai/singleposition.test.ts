/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { CandidatedCell } from '../../src/ai/candidatedcell';
import { SinglePosition } from '../../src/ai/techniques';
import type { Cell } from '../../src/dto/cell';
import { Value } from '../../src/dto/sudoku';

describe('Solving', () => {
  test('Should Return True With Updates', () => {
    const cells: Cell<Value>[] = [
      { Value: Value.Empty },
      { Value: 1 },
      { Value: 2 },
    ];
    const candidates: Value[] = [1, 2, 3];
    const range = cells.map(
      cell => new CandidatedCell<Value>(cell, Value.Empty, candidates)
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
    const cells: Cell<Value>[] = [{ Value: 3 }, { Value: 1 }, { Value: 2 }];
    const candidates: Value[] = [1, 2, 3];
    const range = cells.map(
      cell => new CandidatedCell<Value>(cell, Value.Empty, candidates)
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
    const cells: Cell<Value>[] = [
      { Value: Value.Empty },
      { Value: 1 },
      { Value: 2 },
    ];
    const candidates: Value[] = [1, 2, 3];
    const range = cells.map(
      cell => new CandidatedCell<Value>(cell, Value.Empty, candidates)
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
    const cells: Cell<Value>[] = [
      { Value: Value.Empty },
      { Value: Value.Empty },
      { Value: Value.Empty },
    ];
    const candidates: Value[] = [1, 2, 3];
    const range = cells.map(
      cell => new CandidatedCell<Value>(cell, Value.Empty, candidates)
    );
    const technique = new SinglePosition(range);
    technique.Solve();
    expect(range[0].IsSolved).toBeFalsy();
  });
});

describe('Regression', () => {
  test('Single position should not assign already is solved', () => {
    const cells: Cell<Value>[] = [
      { Value: Value.Empty },
      { Value: Value.Empty },
      { Value: 1 },
      { Value: 2 },
    ];
    const candidates: Value[] = [1, 2, 3];
    const range = cells.map(
      cell => new CandidatedCell<Value>(cell, Value.Empty, candidates)
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
