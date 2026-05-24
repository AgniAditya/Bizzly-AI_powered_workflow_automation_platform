import Groq from "groq-sdk";
import type { ChatCompletionMessageParam, Message } from "../../../types/Message.js";

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const groq = new Groq({ apiKey: GROQ_API_KEY });

export class GroqAI {
  private model: string;

  constructor(model: string = "openai/gpt-oss-20b") {
    this.model = model;
  }

  async getChatCompletion(messages: Message[]) : Promise<Message> {
    if (!GROQ_API_KEY) {
      throw new Error("GROQ_API_KEY is not set in environment variables.");
    }

    const formattedMessages: ChatCompletionMessageParam[] = messages.map((msg) => ({
      role: msg.sender === "user" ? "user" : msg.sender === "assistant" ? "assistant" : "system",
      content: msg.text || "",
    }));

    const chatCompletion = await groq.chat.completions.create({
      messages: formattedMessages,
      model: this.model,
    });

    const response: Message = {
      id: chatCompletion.id,
      text: chatCompletion.choices[0]?.message?.content,
      sender: "assistant",
      timestamp: new Date(),
    }
    
    return response;
  }
}