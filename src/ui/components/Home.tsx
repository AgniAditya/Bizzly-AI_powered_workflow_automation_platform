import { useSelector } from 'react-redux';
import type { Message } from "../../types/Message"
import type { RootState } from "../store/store";
import ConversationBox from "./ConversationBox"
import PromptInput from "./PromptInput"
import Logo from './Logo';

function Home() {
  const messages: Message[] = useSelector((store: RootState) => store.messages.messages);

  return (
    <div className='Main w-full h-full flex flex-col items-center justify-between gap-5 py-10'>
      { messages.length === 0 ? (
        <>
          <div className="StartConversation w-full h-full flex flex-col items-center justify-center">
            <div>
              <Logo />
              <div className="StartConversation-text text-center text-gray-500 text-sm italic">
                Start the conversation by typing a message below!
              </div>
            </div>
            <PromptInput />
          </div>
        </>
        ) : 
        <>
          <ConversationBox /> 
          <PromptInput />
        </>
        }
    </div>
  )
}

export default Home