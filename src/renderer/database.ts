import { ipcRenderer, contextBridge } from 'electron';
import type { EntityBase } from '../data/entitybase';
import { IDatabase, IRepository, key } from '../service/database';

export class Repository<T extends EntityBase> implements IRepository<T> {
  constructor(private instance: T) {}

  public GetOne(id: number): Promise<T> {
    return ipcRenderer.invoke('getOne' + this.instance.name, id);
  }

  public GetAll(): Promise<T[]> {
    return ipcRenderer.invoke('getAll' + this.instance.name);
  }
}

export class Database implements IDatabase {
  public static db: IDatabase;
  entities: Function[];

  constructor() {
    this.InitializeApi();
  }

  InitializeApi() {
    contextBridge.exposeInMainWorld(key, {
      GetRepository: <T extends EntityBase>(instance: T) => {
        return this.GetRepository<T>(instance);
      },
    });
  }

  GetRepository<T extends EntityBase>(instance: T): IRepository<T> {
    const repo = new Repository<T>(instance);
    return {
      GetOne: repo.GetOne.bind(repo),
      GetAll: repo.GetAll.bind(repo),
    };
  }
}

export function InitializeDatabase() {
  Database.db = new Database();
}
