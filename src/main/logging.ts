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

    private async _success(event: IpcMainEvent, message: any): Promise<void> {
      this.Success(message);
    }

    public async Success(message: any): Promise<void> {
      zoya.success(message);
    }

    private async _debug(event: IpcMainEvent, message: any): Promise<void> {
      this.Debug(message);
    }

    public async Debug(message: any): Promise<void> {
      zoya.debug(message);
    }

    private async _info(event: IpcMainEvent, message: any): Promise<void> {
      this.Info(message);
    }

    public async Info(message: any): Promise<void> {
      zoya.info(message);
    }

    private async _warn(event: IpcMainEvent, message: any): Promise<void> {
      this.Warn(message);
    }

    public async Warn(message: any): Promise<void> {
      zoya.warn(message);
    }

    private async _error(event: IpcMainEvent, message: any): Promise<void> {
      this.Error(message);
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
}

Main.Logger.InitializeLogger();
const logger: Main.Logger = Main.Logger.logger;
export default logger;
