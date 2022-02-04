import type { DomainedCell } from './DomainedCell';

export class UniqueConstraint {
  range: DomainedCell[];
  domain: Set<any>;
  blank: any;
  solvedValues: Set<any>;

  public get Range(): DomainedCell[] {
    return [...this.range];
  }

  constructor(range: DomainedCell[], domain: Set<any>, blank: any) {
    this.range = range;
    this.domain = domain;
    this.blank = blank;
    this.Setup();
  }

  Setup() {
    this.solvedValues = new Set(
      this.range.filter(cell => cell.Solved).map(cell => cell.Value)
    );
  }

  SolveOne(): boolean {
    for (const cell of this.range) {
      if (cell.Solved) continue;

      for (const value of this.solvedValues) {
        cell.eliminateValue(value);

        if (cell.Solved) {
          this.solvedValues.add(cell.Value);
          return true;
        }
      }
    }

    const seen: Set<any> = new Set<any>();
    const unique: Set<any> = new Set<any>();

    for (const cell of this.range) {
      if (!cell.Solved) {
        cell.Domain.forEach(value => {
          if (seen.has(value)) return;
          else if (unique.has(value)) {
            unique.delete(value);
            seen.add(value);
          } else unique.add(value);
        });
      }
    }

    if (unique.size == 0) return false;
    for (const cell of this.range) {
      for (const value of cell.Domain) {
        if (unique.has(value)) {
          cell.coerceValue(value);
          console.log('Solved: ', value);
          return true;
        }
      }
    }
  }
}
