export interface IDatabase {
  GetRepository<T>(func: new () => T): IRepository<T>;
}

export interface IRepository<T> {
  GetOne(id: number): Promise<T>;
  GetAll(): Promise<T[]>;
}

export const key: string = 'db';
