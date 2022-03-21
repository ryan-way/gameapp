import { Connection, createConnection, EntityTarget } from 'typeorm';
import type { IpcMainEvent } from 'electron';
import { Entities as Sudoku } from './entity/sudoku';
import { Entities as Test } from './entity/test';
import data from './testdata';
import log from './log';
import type { IpcRequest } from '../ipc/ipcrequest';
import type { IpcChannel } from '../ipc/ipcchannel';
import { DataChannel } from '../ipc/channels';

export namespace Main {
  export class Database implements IpcChannel {
    private connection: Promise<Connection>;
    private entities: Function[];
    private clones: Map<string, any>;

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
      this.InitializeTestData();
    }

    private InitializeTestData(): void {
      this.connection
        .then(async connection => {
          log.Info('Initializing Test Data');
          for (const entity of this.entities) {
            log.Info(`Checking ${entity.name} repo count`);
            const repo = connection.getRepository(entity);
            const count = await repo.count();
            if (count >= data.get(entity.name).length) {
              log.Info('Continuing...');
              continue;
            }
            log.Info('Checking for test data');
            let num: number = 1;
            for (const d of data.get(entity.name)) {
              log.Info(this.clones.get(entity.name));
              const instance = { ...this.clones.get(entity.name) };
              instance['board'] = d;
              await repo.save(instance);
              log.Info(`Save instance number: ${num++}`);
            }
          }
          log.Info('Done Initializing Test Data');
        })
        .catch(log.Error);
    }

    public async handle(event: IpcMainEvent, request: IpcRequest) {
      const [entity, op, args] = request.params;
      let response;
      if (op == 'getAll') {
        response = await this.GetAll(entity);
      } else if (op == 'getOne') {
        const [id] = args;
        response = await this.GetOne(entity, +id);
      } else event.sender.send(request.responseChannel, 'Error');

      event.sender.send(request.responseChannel, response);
    }

    public getName(): string {
      return DataChannel;
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

const database = new Main.Database();
export default database;
