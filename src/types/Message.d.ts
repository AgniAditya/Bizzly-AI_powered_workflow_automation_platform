export type Message = {
    id: string;
    text: string | null;
    sender: 'user' | 'assistant' | 'system';
    timestamp: Date;
}

export type ChatCompletionMessageParam = {
    role: 'user' | 'assistant' | 'system';
    content: string;
}