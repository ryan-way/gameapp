import { Connection, createConnection } from 'typeorm';
import { ipcMain } from 'electron';
import { TestEntity } from './entity/TestEntity';
import type { ITestEntity, TBValue } from './ipc/entity/ITestEntity';

export class DatabaseConnection {
  private connection: Promise<Connection>;

  private static db: DatabaseConnection;
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
    this.InitializeTestData();
  }

  private InitializeTestData(): void {
    this.connection.then(async connection => {
      const testRepo = connection.getRepository(TestEntity);
      const count = await testRepo.count();
      if (count < 5) {
        const remaining: number = 5 - count;
        for (let i = 0; i < remaining; i++) {
          const entity: TestEntity = new TestEntity();
          for (let j = 0; j < entity.board.length; j++) {
            for (let k = 0; k < entity.board[j].length; k++) {
              entity.board[j][k].Value = this.getRandomTBValue();
            }
          }
        }
      }
    });
  }

  private getRandomTBValue(): TBValue {
    const values: TBValue[] = [' ', 'X', 'O'];
    return values[Math.floor(Math.random() * values.length)];
  }

  private InitializeIpc(): void {
    ipcMain.handle('getTestEntities', this.getTestEntities.bind(this));
    ipcMain.handle('getTestEntity', this.getTestEntity.bind(this));
  }

  public async getTestEntities(): Promise<ITestEntity[]> {
    const connection: Connection = await this.connection;
    const testRepo = connection.getRepository(TestEntity);
    return await testRepo.find();
  }

  public async getTestEntity({ id }: { id: number }): Promise<ITestEntity> {
    const connection: Connection = await this.connection;
    const testRepo = connection.getRepository(TestEntity);
    console.log('id:' + id);
    return await testRepo.findOne(id);
  }
}

export function InitializeDatabase(): void {
  DatabaseConnection.InitializeDatabase();
}
