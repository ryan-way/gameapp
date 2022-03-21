import { Test } from '../dto/test';
import { RepositoryBase } from './repositorybase';

export class TestGameRepository extends RepositoryBase<Test.Test> {
  constructor() {
    super(Test.Test);
  }
}
