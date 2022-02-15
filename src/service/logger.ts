export interface ILogger {
  Success(message: any): Promise<void>;
  Debug(message: any): Promise<void>;
  Info(message: any): Promise<void>;
  Warn(message: any): Promise<void>;
  Error(message: any): Promise<void>;
  Failed(message: any): Promise<void>;
  Fatal(message: any): Promise<void>;
}

export const key: string = 'log';
