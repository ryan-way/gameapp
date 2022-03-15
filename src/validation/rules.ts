import type { CandidatedCell } from '../ai/candidatedcell';

export class UniqueValues<T> {
  constructor(private region: CandidatedCell<T>[]) {}

  Check(): boolean {
    return false;
  }
}
