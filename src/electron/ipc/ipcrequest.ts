import type { Channel } from './channels';

export interface IpcRequest {
  responseChannel: Channel;
  params?: string[];
}
