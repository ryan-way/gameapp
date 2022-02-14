import type { IDatabase } from '../service/database';
import type { ILogger } from '../service/logger';

export interface Window {
  data: IDatabase;
  log: ILogger;
}

export const key: string = 'window';
