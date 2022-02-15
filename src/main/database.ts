import { Connection, createConnection, EntityTarget } from 'typeorm';
import { ipcMain } from 'electron';
import { Entities as Sudoku } from './entity/sudoku';
import { Entities as Test } from './entity/test';
import data from './testdata';
import logger from './logging';

export namespace Main {
  export class DatabaseConnection {
    private connection: Promise<Connection>;
    private entities: Function[];
    private clones: Map<string, any>;

    private static db: DatabaseConnection;
    public static InitializeDatabase(): void {
      DatabaseConnection.db = new DatabaseConnection();
    }

    constructor() {
      this.entities = [Test.Test, Sudoku.Sudoku];
      this.clones = new Map<string, any>([
        [Test.Test.name, new Test.Test()],
        [Sudoku.Sudoku.name, new Sudoku.Sudoku()],
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
      this.connection
        .then(async connection => {
          logger.Info('Initializing Test Data');
          for (const entity of this.entities) {
            logger.Info(`Checking ${entity.name} repo count`);
            const repo = connection.getRepository(entity);
            const count = await repo.count();
            if (count >= data.get(entity.name).length) {
              logger.Info('Continuing...');
              continue;
            }
            logger.Info('Checking for test data');
            let num: number = 1;
            for (const d of data.get(entity.name)) {
              logger.Info(this.clones.get(entity.name));
              const instance = { ...this.clones.get(entity.name) };
              instance['board'] = d;
              await repo.save(instance);
              logger.Info(`Save instance number: ${num++}`);
            }
          }
          logger.Info('Done Initializing Test Data');
        })
        .catch(logger.Error);
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
}

export function InitializeDatabase(): void {
  Main.DatabaseConnection.InitializeDatabase();
}
