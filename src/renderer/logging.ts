import { contextBridge, ipcRenderer } from 'electron';
import type { ILogger } from '../ipc/service/logger';

export class Logger implements ILogger {
  public static logger: ILogger;

  Success(): Promise<void> {
    return ipcRenderer.invoke('logSuccess');
  }

  Debug(): Promise<void> {
    return ipcRenderer.invoke('logDebug');
  }

  Info(): Promise<void> {
    return ipcRenderer.invoke('logInfo');
  }

  Warn(): Promise<void> {
    return ipcRenderer.invoke('logWarn');
  }

  Error(): Promise<void> {
    return ipcRenderer.invoke('logError');
  }

  Failed(): Promise<void> {
    return ipcRenderer.invoke('logFailed');
  }

  Fatal(): Promise<void> {
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
