"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = require("path");
const electron_updater_1 = require("electron-updater");
const isDev = require("electron-is-dev");
let mainWindow;
/**
 *
 */
function createWindow() {
    // Create the browser window.
    mainWindow = new electron_1.BrowserWindow({
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'),
        },
        width: 800,
    });
    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, '../html/index.html'));
    if (isDev) {
        mainWindow.webContents.openDevTools();
    }
    else {
        console.log('Running in production');
    }
    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
}
electron_1.app.on('activate', () => {
    // On OS X it"s common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});
// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
//-------------------------------------------------------------------
// Open a window that displays the version
//
// THIS SECTION IS NOT REQUIRED
//
// This isn't required for auto-updates to work, but it's easier
// for the app to show a window than to have to click "About" to see
// that updates are working.
//-------------------------------------------------------------------
let win;
function sendStatusToWindow(text) {
    console.log(text);
    if (win) {
        win.webContents.send('message', text);
    }
}
function createDefaultWindow() {
    if (!win) {
        let win = new electron_1.BrowserWindow({
            parent: mainWindow,
            modal: true,
            show: false,
            height: 200,
            width: 350,
            autoHideMenuBar: true,
            webPreferences: {
                nodeIntegration: true
            }
        });
        win.once('ready-to-show', () => {
            win.show();
        });
        win.on('closed', () => {
            win = null;
        });
        win.loadFile(path.join(__dirname, '../html/version.html'));
    }
    return win;
}
function destroyWin() {
    if (win) {
        win.destroy();
        win = null;
    }
}
// autoUpdater.on('checking-for-update', () => {
//   createDefaultWindow();
//   sendStatusToWindow('Checking for update...');
// })
// autoUpdater.on('update-available', (info) => {
//   createDefaultWindow();
//   sendStatusToWindow('Update available.');
// })
// autoUpdater.on('update-not-available', (info) => {
//   sendStatusToWindow('Update not available.');
// })
// autoUpdater.on('error', (err) => {
//   sendStatusToWindow('Error in auto-updater. ' + err);
// })
// autoUpdater.on('download-progress', (progressObj) => {
//   let log_message = "Download speed: " + progressObj.bytesPerSecond;
//   log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
//   log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
//   sendStatusToWindow(log_message);
// })
// autoUpdater.on('update-downloaded', (info) => {
//   sendStatusToWindow('Update downloaded');
//   destroyWin();
// });
electron_1.app.on('ready', function () {
    // Create the Menu
    if (mainWindow == null) {
        createWindow();
    }
    electron_updater_1.autoUpdater.checkForUpdatesAndNotify();
});
electron_1.app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
//# sourceMappingURL=main.js.map