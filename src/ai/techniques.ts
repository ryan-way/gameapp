import type { CandidatedCell } from './candidatedcell';

export interface ITechnique {
  Solve(): boolean;
  SolveOne(): boolean;
}

export class UniqueRegion<T> implements ITechnique {
  public get Range(): CandidatedCell<T>[] {
    return [...this.range];
  }

  constructor(private range: CandidatedCell<T>[]) {}

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

  SolveOne(): boolean {
    const solvedValues = this.range
      .filter(cell => cell.IsSolved)
      .map(cell => cell.Value);
    for (const value of solvedValues) {
      for (const cell of this.range.filter(cell => !cell.IsSolved)) {
        if (cell.Remove(value)) return true;
      }
    }
    return false;
  }
}

export class SinglePosition<T> implements ITechnique {
  public get Range(): CandidatedCell<T>[] {
    return [...this.range];
  }

  constructor(private range: CandidatedCell<T>[]) {}

  Solve(): boolean {
    let status: boolean = false;
    const candidates = this.range
      .filter(cell => !cell.IsSolved)
      .map(cell => cell.Candidates)
      .flat();

    const occurences = new Map<T, number>();
    for (const candidate of candidates) {
      occurences.set(
        candidate,
        occurences.has(candidate) ? occurences.get(candidate) + 1 : 1
      );
    }

    const unique = new Set<T>(
      [...occurences.entries()]
        .filter(occurence => occurence[1] == 1)
        .map(occurence => occurence[0])
    );

    for (const cell of this.range.filter(cell => !cell.IsSolved)) {
      for (const candidate of cell.Candidates) {
        if (unique.has(candidate)) {
          cell.Assign(candidate);
          status = true;
          break;
        }
      }
    }

    return status;
  }

  SolveOne(): boolean {
    const candidates = this.range
      .filter(cell => !cell.IsSolved)
      .map(cell => cell.Candidates)
      .flat();

    const occurences = new Map<T, number>();
    for (const candidate of candidates) {
      occurences.set(
        candidate,
        occurences.has(candidate) ? occurences.get(candidate) + 1 : 1
      );
    }

    const unique = new Set<T>(
      [...occurences.entries()]
        .filter(occurence => occurence[1] == 1)
        .map(occurence => occurence[0])
    );

    for (const cell of this.range.filter(cell => !cell.IsSolved)) {
      for (const candidate of cell.Candidates) {
        if (unique.has(candidate)) {
          cell.Assign(candidate);
          return true;
        }
      }
    }
    return false;
  }
}
