export interface ILogger {
  Success(): Promise<void>;
  Debug(): Promise<void>;
  Info(): Promise<void>;
  Warn(): Promise<void>;
  Error(): Promise<void>;
  Failed(): Promise<void>;
  Fatal(): Promise<void>;
}
