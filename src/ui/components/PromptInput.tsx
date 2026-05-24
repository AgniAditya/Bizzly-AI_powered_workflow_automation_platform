import { useState } from 'react'
import type { Message } from "../../types/Message"
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../store/features/messageSlice';
import { SendHorizontal } from 'lucide-react';
import type { RootState } from '../store/store';

function PromptInput() {
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
    <div className="PromptInput w-3xl">
        <form 
        onSubmit={(e) => handleSubmit(e)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            handleSubmit(e);
          }
        }} 
        className="w-full flex items-center">
            <textarea
                className="w-full min-h-15 p-2 rounded-lg bg-[#1f1f1f] text-white placeholder:text-gray-500 focus:outline-none resize-none"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" 
            className="p-4 bg-[#e2e2e2] text-black rounded-full hover:bg-gray-200 flex items-center justify-center cursor-pointer ml-2"
            ><SendHorizontal /></button>
        </form>
    </div>
  )
}

export default PromptInput