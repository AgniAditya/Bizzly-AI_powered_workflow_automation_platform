import { ipcMain } from 'electron';
import { Message } from '../types/Message.js';
import { GroqAI } from './services/ai-runtime/groqAI.js';

const groqAI = new GroqAI();

export function registerIpcHandlers() {
    ipcMain.handle('getChatCompletion', async (event, messages: Message[]): Promise<Message> => {
        try {
            return await groqAI.getChatCompletion(messages);
        } catch (error) {
            console.error('Groq IPC error:', error);
            throw error; // or return a safe error object
        }
    });
}