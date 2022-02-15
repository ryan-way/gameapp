import { contextBridge, ipcRenderer } from 'electron';
import type { ILogger } from '../service/logger';

export class Logger implements ILogger {
  public static logger: ILogger;

  Success(message: any): Promise<void> {
    return ipcRenderer.invoke('logSuccess');
  }

  Debug(message: any): Promise<void> {
    return ipcRenderer.invoke('logDebug');
  }

  Info(message: any): Promise<void> {
    return ipcRenderer.invoke('logInfo');
  }

  Warn(message: any): Promise<void> {
    return ipcRenderer.invoke('logWarn');
  }

  Error(message: any): Promise<void> {
    return ipcRenderer.invoke('logError');
  }

  Failed(message: any): Promise<void> {
    return ipcRenderer.invoke('logFailed');
  }

  Fatal(message: any): Promise<void> {
    return ipcRenderer.invoke('logFatal');
  }
}

export function InitializeLogger() {
  Logger.logger = new Logger();
  contextBridge.exposeInMainWorld('log', {
    Success: Logger.logger.Success.bind(this),
    Debug: Logger.logger.Debug.bind(this),
    Info: Logger.logger.Info.bind(this),
    Warn: Logger.logger.Warn.bind(this),
    Error: Logger.logger.Error.bind(this),
    Failed: Logger.logger.Failed.bind(this),
    Fatal: Logger.logger.Fatal.bind(this),
  });
}
