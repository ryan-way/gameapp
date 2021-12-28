import type { ITestEntity } from './ipc/entity/ITestEntity';

export type DB = {
  getTestEntities(): ITestEntity;
};

export type Window = {
  db: DB;
};
