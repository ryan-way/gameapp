import { Connection, createConnection } from 'typeorm';
import { ipcMain } from 'electron';
import { TestEntity } from './entity/TestEntity';
import type { ITestEntity } from './ipc/entity/ITestEntity';

export interface IDatabaseConnection {
  getTestEntities(): Promise<ITestEntity[]>;
}

export class DatabaseConnection implements IDatabaseConnection {
  private connection: Promise<Connection>;

  private static db: IDatabaseConnection;
  public static InitializeDatabase(): void {
    DatabaseConnection.db = new DatabaseConnection();
  }

  constructor() {
    this.connection = createConnection({
      type: 'better-sqlite3',
      database: 'database.sqlite',
      synchronize: true,
      logging: true,
      entities: [TestEntity],
      migrations: [],
      subscribers: [],
    });
    this.InitializeIpc();
  }

  private InitializeIpc(): void {
    ipcMain.handle('getTestEntities', this.getTestEntities.bind(this));
  }

  public async getTestEntities(): Promise<ITestEntity[]> {
    const connection: Connection = await this.connection;
    const testRepo = connection.getRepository(TestEntity);
    return await testRepo.find();
  }
}

export function InitializeDatabase(): void {
  DatabaseConnection.InitializeDatabase();
}
