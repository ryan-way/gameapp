import type { EntityBase } from '../data/entitybase';
import { DataChannel, DataResponse } from '../ipc/Channels';
import type { IpcRequest } from '../ipc/IpcRequest';
import type { Window } from './window';

const ipc = (window as unknown as Window).ipc;
console.log(ipc);
export abstract class BaseRepository<T extends EntityBase> {
  private sendChannel: string = DataChannel;
  private receiveChannel: string = DataResponse;
  constructor(private entity: new () => T) {}

  private send<Entity>(request: IpcRequest): Promise<Entity> {
    return ipc.send(this.sendChannel, request);
  }

  public GetOne(id: number): Promise<T> {
    const request = {
      responseChannel: this.receiveChannel,
      params: [this.entity.name, 'getOne', id.toString()],
    };
    return this.send<T>(request);
  }

  public GetAll(): Promise<T[]> {
    const request = {
      responseChannel: this.receiveChannel,
      params: [this.entity.name, 'getAll'],
    };
    return this.send<T[]>(request);
  }
}
