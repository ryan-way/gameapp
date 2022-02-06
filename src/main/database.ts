import { Connection, createConnection, EntityTarget } from 'typeorm';
import { ipcMain } from 'electron';
import { TestEntity } from './entity/TestEntity';
import type { TBValue } from '../entity/ITestEntity';
import { Db } from './entity/SudokuEntity';

export class DatabaseConnection {
  private connection: Promise<Connection>;
  private entities: Function[];

  private static db: DatabaseConnection;
  public static InitializeDatabase(): void {
    DatabaseConnection.db = new DatabaseConnection();
  }

  constructor() {
    this.entities = [TestEntity, Db.SudokuEntity];
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
        // TODO: put test data into separate file, instead of this mess
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
      })
      .then(async connection => {
        const sudokuRepo = connection.getRepository(Db.SudokuEntity);
      const count = await sudokuRepo.count();
      if (count < 1) {
        const entity: Db.SudokuEntity = new Db.SudokuEntity();
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
