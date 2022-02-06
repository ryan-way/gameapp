import { Connection, createConnection, EntityMetadata, EntityTarget } from 'typeorm';
import { ipcMain } from 'electron';
import { TestEntity } from './entity/TestEntity';
import { Db } from './entity/SudokuEntity';
import data from './testdata';

export class DatabaseConnection {
  private connection: Promise<Connection>;
  private entities: Function[];
  private clones: Map<string, any>;

  private static db: DatabaseConnection;
  public static InitializeDatabase(): void {
    DatabaseConnection.db = new DatabaseConnection();
  }

  constructor() {
    this.entities = [TestEntity, Db.SudokuEntity];
    this.clones = new Map<string, any>([
      [TestEntity.name, new TestEntity()],
      [Db.SudokuEntity.name, new Db.SudokuEntity()],
    ]);
    this.connection = createConnection({
      type: 'better-sqlite3',
      database: 'database.sqlite',
      synchronize: true,
      logging: true,
      entities: this.entities,
      migrations: [],
      subscribers: [],
    });
    this.InitializeIpc();
    this.InitializeTestData();
  }

  private InitializeTestData(): void {
    this.connection.then(async connection => {
      console.log('Initializing Test Data');
      for (const entity of this.entities) {
        console.log('Checking', entity.name, 'repo count');
        const repo = connection.getRepository(entity);
        const count = await repo.count();
        if (count != 0) {
          console.log('Continuing...');
          continue;
        }
        console.log('Checking for test data');
        let num: number = 1;
        for (const d of data.get(entity.name)) {
          console.log(this.clones[entity.name]);
          const instance = { ...this.clones[entity.name] };
          instance['board'] = d;
          await repo.save(instance);
          console.log('Saved instance number:', num++);
        }
      }
      console.log('Done Initializing Test Data');
      return connection;
    });
  }

  private InitializeIpc(): void {
    for (const entity of this.entities) {
      ipcMain.handle('getAll' + entity.name, this.GetAll.bind(this, entity));
      ipcMain.handle('getOne' + entity.name, (event, id) => {
        return this.GetOne(entity, id);
      });
    }
  }

  private async GetAll<T>(target: EntityTarget<T>): Promise<T[]> {
    const connection: Connection = await this.connection;
    const repo = connection.getRepository(target);
    return await repo.find();
  }

  private async GetOne<T>(target: EntityTarget<T>, id: number): Promise<T> {
    const connection: Connection = await this.connection;
    const repo = connection.getRepository(target);
    return await repo.findOne(id);
  }
}

export function InitializeDatabase(): void {
  DatabaseConnection.InitializeDatabase();
}
