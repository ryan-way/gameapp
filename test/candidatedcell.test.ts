/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { CandidatedCell } from '../src/ai/candidatedcell';
import type { Cell } from '../src/data/cell';
import type { Sudoku } from '../src/data/sudoku';

function getCell(cellValue: Sudoku.Value = ' '): CandidatedCell<Sudoku.Value> {
  const candidates: Sudoku.Value[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const cell: Cell<Sudoku.Value> = {
    Value: cellValue,
  };

  return new CandidatedCell(cell, ' ', candidates);
}

describe('Testing Start State', () => {
  describe('Passing In Default Value', () => {
    const candidatedCell = getCell();
    test('Should Be Default', () => {
      expect(candidatedCell.IsDefault).toBeTruthy();
    });

    test('Should Be Not Committed', () => {
      expect(candidatedCell.IsCommited).toBeFalsy();
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

    test('Should Be Not Committed', () => {
      expect(candidatedCell.IsCommited).toBeFalsy();
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
      const valuesToRemove: Sudoku.Value[] = [1, 2, 3, 4, 5, 6, 7, 8];
      valuesToRemove.forEach(value => {
        candidatedCell.Remove(value);
      });
      expect(candidatedCell.IsSolved).toBeTruthy();
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
  describe('Committing', () => {
    const candidatedCell = getCell();
    test('Should Throw If Not Solved', () => {
      expect(() => candidatedCell.Commit()).toThrow();
    });
    test('Value should Solve', () => {
      candidatedCell.Assign(1);
      candidatedCell.Commit();
      expect(candidatedCell.Value).toBe(1);
    });
  });
});
