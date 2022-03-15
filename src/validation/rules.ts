import type { CandidatedCell } from '../ai/candidatedcell';

export class UniqueValues<T> {
  constructor(private range: CandidatedCell<T>[]) {}

  Check(): boolean {
    const values: Set<T> = new Set();

    return this.range
      .filter(cell => cell.IsSolved)
      .every(cell => {
        if (values.has(cell.Value)) return false;
        values.add(cell.Value);
        return true;
      });
  }
}
