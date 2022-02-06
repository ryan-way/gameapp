import type { Cell } from '../entity/Cell';

export class DomainedCell {
  public get Value(): any {
    return this.cell.Value;
  }

  public get Domain(): any[] {
    return [...this.domain];
  }

  private cell: Cell;
  private domain: Set<any>;
  private blank: any;

  public get Solved(): boolean {
    return this.domain.size == 1;
  }

  constructor(cell: Cell, domain: Set<any>, blank: any) {
    this.cell = cell;
    this.domain = new Set<any>([...domain]);
    this.blank = blank;
    this.clampConstraint();
  }

  clampConstraint(): void {
    if (this.cell.Value != this.blank) this.domain = new Set([this.cell.Value]);
  }

  eliminateValue(value: any) {
    this.domain.delete(value);
    if (this.domain.size == 1) {
      this.cell.Value = this.domain.values[0];
      console.log("Value assigned: ", this.cell.Value);
    }
  }

  coerceValue(value: any) {
    this.domain = new Set([value]);
    this.cell.Value = value;
    console.log("Value coerced: ", this.cell.Value);
  }
}
