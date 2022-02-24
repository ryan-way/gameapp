import { Test } from '../data/test';
import { BaseRepository } from '../renderer/baserepository';

export class TestGameRepository extends BaseRepository<Test.Test> {
  constructor() {
    super(Test.Test);
  }
}
