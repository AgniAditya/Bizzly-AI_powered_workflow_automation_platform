import { useState } from 'react'
import type { Message } from "../../types/Message"
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../store/features/messageSlice';
import { SendHorizontal } from 'lucide-react';
import type { RootState } from '../store/store';

function PromptInput() {
  const [enabled, setEnabled] = useState(false);
  const [input, setInput] = useState<string>('');
  const dispatch = useDispatch();
  const messages: Message[] = useSelector((state: RootState) => state.messages.messages);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    if(input.trim() === '') return; // Prevent sending empty messages
    const message : Message = {
      id: Date.now().toString(),
      text: input.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    dispatch(addMessage(message)); // Add message to Redux store
    setInput(''); // Clear input after sending

    window.electron.getChatCompletion([...messages, message]).then((response: Message) => {
      dispatch(addMessage(response)); // Add assistant's response to Redux store
    }).catch((error) => {
      console.error("Error getting chat completion:", error);
    })
  };

  return (
    <div className="PromptInput w-2xl flex items-center justify-center gap-4 p-4">
        {/* <ToggleButton /> */}
        <div className="flex flex-col justify-between">
          <button
          onClick={() => setEnabled(!enabled)}
          className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-300 ${
            enabled ? "bg-green-500" : "bg-gray-400"}`}
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
                enabled ? "translate-x-9" : "translate-x-1"
              }`}
            />
          </button>
          <span className="flex justify-center text-sm font-medium text-gray-700">
            {enabled ? "MCP ON" : "MCP OFF"}
          </span>
        </div>
        <form 
        onSubmit={(e) => handleSubmit(e)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            handleSubmit(e);
          }
        }} 
        className="w-full flex items-center gap-2">
            <textarea
                className="w-full min-h-10 px-5 py-3 rounded-lg bg-[#1f1f1f] text-white placeholder:text-gray-500 focus:outline-none resize-none"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" 
            className="p-3 bg-[#e2e2e2] text-black rounded-full hover:bg-gray-200 flex items-center justify-center cursor-pointer"
            ><SendHorizontal size={20}/></button>
        </form>
    </div>
  )
}

export default PromptInput