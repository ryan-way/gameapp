import { Test } from '../data/test';
import { BaseRepository } from '../renderer/database';

export class TestGameRepository extends BaseRepository<Test.Test> {
  constructor() {
    super(Test.Test);
  }
}
