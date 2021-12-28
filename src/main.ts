import { app, BrowserWindow, ipcMain } from 'electron';
import { createConnection } from 'typeorm';
import fs from 'fs';
import path from 'path';
import { TestEntity } from './entity/TestEntity';
// This allows TypeScript to pick up the magic constant that's auto-generated
// by Forge's Webpack plugin that tells the Electron app where to look for the
// Webpack-bundled app code (depending on whether you're running in development
// or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
let games: TestEntity[];
createConnection({
  type: 'better-sqlite3',
  database: 'database.sqlite',
  synchronize: true,
  logging: true,
  entities: [TestEntity],
  migrations: [],
  subscribers: [],
}).then(async connection => {
  const testRepo = connection.getRepository(TestEntity);
  testRepo.count().then(count => {
    if (count < 5) {
      const game: TestEntity = new TestEntity();
      game.board = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' '],
      ];
      for (var row: number = 0; row < game.board.length; row++) {
        for (var col: number = 0; col < game.board[row].length; col++) {
          var rand: number = Math.floor(Math.random() * 3);
          switch (rand) {
            case 0:
              game.board[row][col] = ' ';
              break;
            case 1:
              game.board[row][col] = 'X';
              break;
            case 2:
              game.board[row][col] = 'O';
              break;
          }
        }
      }
      return connection.manager.save(game).then(game => {
        console.log('Game has been saved. Game id is', game.id);
      });
    }
  });
  testRepo.find().then((entities: TestEntity[]) => {
    games = entities;
  });
});

ipcMain.on('getTestEntities', (event, arg) => {
  event.returnValue = games;
});
