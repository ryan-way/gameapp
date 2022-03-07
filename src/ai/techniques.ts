import type { CandidatedCell } from './candidatedcell';

export class UniqueRegion<T> {
  public get Range(): CandidatedCell<T>[] {
    return [...this.range];
  }

  constructor(private range: CandidatedCell<T>[]) { }

  Solve(): boolean {
    const solvedValues = this.range
      .filter(cell => cell.IsSolved)
      .map(cell => cell.Value);
    let status: boolean = false;
    for (const value of solvedValues) {
      for (const cell of this.range.filter(cell => !cell.IsSolved)) {
        status = cell.Remove(value) || status;
      }
    }
    return status;
  }
}
