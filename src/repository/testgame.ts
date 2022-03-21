import { Test } from '../data/test';
import { RepositoryBase } from './repositorybase';

export class TestGameRepository extends RepositoryBase<Test.Test> {
  constructor() {
    super(Test.Test);
  }
}
