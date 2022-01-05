import type { ITestEntity } from './ipc/entity/ITestEntity';

export interface DB {
  getTestEntities(): ITestEntity;
}

export interface Window {
  db: DB;
}
