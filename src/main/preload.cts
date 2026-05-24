const { contextBridge, ipcRenderer } = require('electron')
import type { Message } from '../types/Message.js';

contextBridge.exposeInMainWorld('electron', { 
    getChatCompletion: (messages: Message[]) => ipcRenderer.invoke('getChatCompletion', messages)
})