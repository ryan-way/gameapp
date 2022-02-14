export class EntityBase {
  readonly name: string;
  constructor() {
    this.name = this.constructor.name;
  }
}
