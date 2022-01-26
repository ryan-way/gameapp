import type { ITestEntity } from '../entity/ITestEntity';

export interface IDatabase {
  getTestEntities(): Promise<ITestEntity[]>;
}
