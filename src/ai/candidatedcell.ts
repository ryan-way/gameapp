import type { Cell } from '../data/cell';

export class CandidatedCell<T> {
  private candidates: Set<T>;

  public get Value(): T {
    return this.cell.Value;
  }

  public get Candidates(): T[] {
    return [...this.candidates];
  }

  public get IsDefault(): boolean {
    return this.cell.Value == this.def;
  }

  public get IsCommited(): boolean {
    return this.IsSolved && !this.IsDefault;
  }

  public get IsSolved(): boolean {
    return this.candidates.size === 1;
  }

  constructor(private cell: Cell<T>, private def: T, candidates: T[]) {
    this.candidates = new Set(candidates);
  }

  public Assign(candidate: T) {
    if (!this.candidates.has(candidate)) {
      throw new Error('Assigning candidate not previously in candidate list');
    }
    this.candidates = new Set([candidate]);
  }

  public Commit(): void {
    if (this.candidates.size > 1) {
      throw new Error('Committing value with more than one possible Candidate');
    }
    this.cell.Value = this.candidates.values().next().value;
  }

  public Remove(value: T) {
    if (this.IsSolved && this.candidates.has(value)) {
      throw new Error('Removing Last Candidate');
    }
    this.candidates.delete(value);
  }
}
