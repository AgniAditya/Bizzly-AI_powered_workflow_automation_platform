export {};

declare global {
    interface Window {
        electron: {
            getChatCompletion: (messages: Message[]) => Promise<Message>;
        }
    }
}