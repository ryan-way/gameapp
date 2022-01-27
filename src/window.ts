import type { IDatabase } from './ipc/service/database';
import type { ILogger } from './ipc/service/logger';

export interface Window {
  db: IDatabase;
  log: ILogger;
}

export const key: string = 'window';
