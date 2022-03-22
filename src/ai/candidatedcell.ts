import type { Cell } from '../dto/cell';

export class CandidatedCell<T> {
  private candidates: Set<T>;

  public get Value(): T {
    return this.IsSolved
      ? this.candidates.values().next().value
      : this.cell.Value;
  }

  public get Candidates(): T[] {
    return [...this.candidates];
  }

  public get IsDefault(): boolean {
    return this.cell.Value == this.def;
  }

  public get IsSolved(): boolean {
    return this.candidates.size === 1;
  }

  constructor(private cell: Cell<T>, private def: T, candidates: T[]) {
    this.candidates = new Set(candidates);
  }

  public Assign(candidate: T) {
    if (!this.candidates.has(candidate)) {
      throw new Error(
        `Assigning candidate (${candidate} of type ${typeof candidate})` +
          ` not previously in candidate list: ${[...this.candidates]}`
      );
    }
    this.candidates = new Set([candidate]);
  }

  public Remove(value: T): boolean {
    if (this.IsSolved && this.candidates.has(value)) {
      throw new Error('Removing Last Candidate');
    }
    if (this.candidates.has(value)) {
      this.candidates.delete(value);
      return true;
    }
    return false;
  }
}
