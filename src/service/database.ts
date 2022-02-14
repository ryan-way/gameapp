import type { EntityBase } from '../data/entitybase';

export interface IDatabase {
  GetRepository<T extends EntityBase>(instance: T): IRepository<T>;
}

export interface IRepository<T extends EntityBase> {
  GetOne(id: number): Promise<T>;
  GetAll(): Promise<T[]>;
}

export const key: string = 'data';
