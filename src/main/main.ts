import path from 'path';
import { app, BrowserWindow } from 'electron';
import { isDevMode } from './util.js';
import { getPreloadPath } from './pathResolver.js';
import { registerIpcHandlers } from './ipcHandlers.js';


const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: getPreloadPath(),
      contextIsolation: true,
      nodeIntegration: false
    },
  });
  
  if(isDevMode()) {
    mainWindow.loadURL('http://localhost:3437');
  } 
  else { 
    mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'));
  }
}

registerIpcHandlers();

app.on('ready', createWindow);