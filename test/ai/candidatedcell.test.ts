/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { CandidatedCell } from '../../src/ai/candidatedcell';
import type { Cell } from '../../src/dto/cell';
import { Value } from '../../src/dto/sudoku';

function getCell(cellValue: Value = Value.Empty): CandidatedCell<Value> {
  const candidates: Value[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const cell: Cell<Value> = {
    Value: cellValue,
  };

  return new CandidatedCell(cell, Value.Empty, candidates);
}

describe('Testing Start State', () => {
  describe('Passing In Default Value', () => {
    const candidatedCell = getCell();
    test('Should Be Default', () => {
      expect(candidatedCell.IsDefault).toBeTruthy();
    });

    test('Should Be Not Solved', () => {
      expect(candidatedCell.IsSolved).toBeFalsy();
    });
  });

  describe('Passing In Solved Value', () => {
    const candidatedCell = getCell(1);
    test('Should Be Not Default', () => {
      expect(candidatedCell.IsDefault).toBeFalsy();
    });

    test('Should Be Not Solved', () => {
      expect(candidatedCell.IsSolved).toBeFalsy();
    });
  });
});

describe('Testing State Changes', () => {
  describe('Removing', () => {
    const candidatedCell = getCell();
    test('All But One Values Should Solve', () => {
      expect(candidatedCell.IsSolved).toBeFalsy();
      const valuesToRemove: Value[] = [1, 2, 3, 4, 5, 6, 7, 8];
      valuesToRemove.forEach(value => {
        expect(candidatedCell.Remove(value)).toBeTruthy();
      });
      expect(candidatedCell.IsSolved).toBeTruthy();
    });
    test('Already elminated value returns false', () => {
      expect(candidatedCell.Remove(1)).toBeFalsy();
    });
    test('Last Value Should Throw', () => {
      expect(() => candidatedCell.Remove(9)).toThrow();
    });
  });
  describe('Assigning', () => {
    const candidatedCell = getCell();
    test('Value Should Solve', () => {
      expect(candidatedCell.IsSolved).toBeFalsy();
      candidatedCell.Assign(9);
      expect(candidatedCell.IsSolved).toBeTruthy();
    });
    test('Value Not In Candidate List Should Throw', () => {
      expect(() => candidatedCell.Assign(1)).toThrow();
    });
  });
});
