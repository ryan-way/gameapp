/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { CandidatedCell } from '../../src/ai/candidatedcell';
import { UniqueValues } from '../../src/validation/rules';
import { mock, instance, when, anything } from 'ts-mockito';
import type { Cell } from '../../src/dto/cell';
import { Value } from '../../src/dto/sudoku';
import { Log, setLogger } from '../../src/service/logging';

beforeAll(() => {
  const mockedLog = mock(Log);
  when(mockedLog.Debug(anything())).thenReturn();
  const logger = instance(mockedLog);
  setLogger(logger);
});

describe('UniqueValue', () => {
  test('should return false if invalid', () => {
    const cells: Cell<Value>[] = [{ Value: 1 }, { Value: 1 }, { Value: 2 }];
    const candidates: Value[] = [1, 2, 3];
    const range = cells.map(
      cell => new CandidatedCell<Value>(cell, Value.Empty, candidates)
    );
    range
      .filter(cell => !cell.IsDefault)
      .forEach(cell => {
        cell.Assign(cell.Value);
      });

    const rule = new UniqueValues(range);
    expect(rule.Check()).toBeFalsy();
  });
  test('should return true if valid', () => {
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

    const rule = new UniqueValues(range);
    expect(rule.Check()).toBeTruthy();
  });
});
