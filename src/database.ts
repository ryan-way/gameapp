import { Connection, createConnection } from 'typeorm';
import { ipcMain } from 'electron';
import { TestEntity } from './entity/TestEntity';
import type { ITestEntity, TBValue } from './ipc/entity/ITestEntity';
import { SudokuEntity } from './entity/SudokuEntity';
import type { ISudokuEntity } from './ipc/entity/ISudokuEntity';

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
      entities: [TestEntity, SudokuEntity],
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
          await testRepo.save(entity);
        }
      }

      return connection;
    }).then(async connection => {
      const sudokuRepo = connection.getRepository(SudokuEntity);
      const count = await sudokuRepo.count();
      if (count < 1) {
        const entity: SudokuEntity = new SudokuEntity();
        entity.board = [
          [ { Value: ' '}, { Value: 5},   { Value: ' '}, { Value: 4},   { Value: ' '}, { Value: ' '}, { Value: 1},   { Value: 7 },  { Value: ' ' }],
          [ { Value: 9},   { Value: 4},   { Value: 8},   { Value: ' '}, { Value: ' '}, { Value: ' '}, { Value: ' '}, { Value: ' '}, { Value: ' '}],
          [ { Value:' '},  { Value: 7},   { Value: ' '}, { Value: ' '}, { Value: ' '}, { Value: 8},   { Value: 6},   { Value: 4},   { Value: ' '}],
          [ { Value:' '},  { Value: ' '}, { Value: 4},   { Value: ' '}, { Value: 2},   { Value: 3},   { Value: 9},   { Value: ' '}, { Value: ' ' }],
          [ { Value:' '},  { Value: 8},   { Value: ' '}, { Value: ' '}, { Value: 4},   { Value: ' '}, { Value: ' '}, { Value: 6},   { Value: ' '}],
          [ { Value:' '},  { Value: ' '}, { Value: 2},   { Value: 8},   { Value: 7},   { Value: ' '}, { Value: 3},   { Value: ' '}, { Value: ' '}],
          [ { Value:' '},  { Value: 2},   { Value: 5},   { Value: 9},   { Value: ' '}, { Value: ' '}, { Value: ' '}, { Value: 1},   { Value: ' '}],
          [ { Value:' '},  { Value: ' '}, { Value: ' '}, { Value: ' '}, { Value: ' '}, { Value: ' '}, { Value: 8},   { Value: 2},   { Value: 7}],
          [ { Value:' '},  { Value: 3},   { Value: 7},   { Value: ' '}, { Value: ' '}, { Value: 4},   { Value: ' '}, { Value: 9},   { Value: ' '}],
        ];
        await sudokuRepo.save(entity);
        console.log('id: ', entity.id);
      }

      return connection;
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

  public async getSudokuEntities(): Promise<ISudokuEntity[]> {
    const connection: Connection = await this.connection;
    const SudokuRepo = connection.getRepository(SudokuEntity);
    return await SudokuRepo.find();
  }

  public async getSudokuEntity({ id }: { id: number }): Promise<ISudokuEntity> {
    const connection: Connection = await this.connection;
    const SudokuRepo = connection.getRepository(SudokuEntity);
    console.log('id:' + id);
    return await SudokuRepo.findOne(id);
  }
}

export function InitializeDatabase(): void {
  DatabaseConnection.InitializeDatabase();
}
