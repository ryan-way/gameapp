import { ipcMain, IpcMainEvent } from 'electron';
import { isNullOrUndefined } from 'util';
import zoya from 'zoya';

export namespace Main {
  export class Logger {
    private static _logger: Logger;
    public static InitializeLogger(): void {
      Logger._logger = new Logger();
    }
    public static get logger() {
      if (isNullOrUndefined(Logger._logger)) {
        Logger.InitializeLogger();
      }
      return Logger._logger;
    }

    constructor() {
      this.InitializeIpc();
    }

    private InitializeIpc(): void {
      ipcMain.handle('logSuccess', this._success.bind(this));
      ipcMain.handle('logDebug', this._debug.bind(this));
      ipcMain.handle('logInfo', this._info.bind(this));
      ipcMain.handle('logWarn', this._warn.bind(this));
      ipcMain.handle('logError', this._error.bind(this));
      ipcMain.handle('logFailed', this._failed.bind(this));
      ipcMain.handle('logFatal', this._fatal.bind(this));
    }

    private async _success(event: IpcMainEvent, ...args): Promise<void> {
      this.Success(args);
    }

    public async Success(...args): Promise<void> {
      zoya.success(args);
    }

    private async _debug(event: IpcMainEvent, ...args): Promise<void> {
      this.Debug(args);
    }

    public async Debug(...args): Promise<void> {
      zoya.debug(args);
    }

    private async _info(event: IpcMainEvent, ...args): Promise<void> {
      this.Info(args);
    }

    public async Info(...args): Promise<void> {
      zoya.info(args);
    }

    private async _warn(event: IpcMainEvent, ...args): Promise<void> {
      this.Warn(args);
    }

    public async Warn(...args): Promise<void> {
      zoya.warn(args);
    }

    private async _error(event: IpcMainEvent, ...args): Promise<void> {
      this.Error(args);
    }

    public async Error(...args): Promise<void> {
      zoya.error(args);
    }

    private async _failed(event: IpcMainEvent, ...args): Promise<void> {
      this.Failed(args);
    }

    public async Failed(...args): Promise<void> {
      zoya.failed(args);
    }

    private async _fatal(event: IpcMainEvent, ...args): Promise<void> {
      this.Fatal(args);
    }

    public async Fatal(...args): Promise<void> {
      zoya.fatal(args);
    }
  }

  export function InitializeLogger(): void {
    Logger.InitializeLogger();
  }
}

export default Main.Logger.logger;
