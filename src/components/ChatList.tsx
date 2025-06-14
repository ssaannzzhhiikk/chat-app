//chatlist.tsx
import ChatItem from './ChatItem';
import React from 'react';
import { useNavigate } from 'react-router-dom'

interface ChatData {
  userName: string;
  lastMsgTime: string;
  lastMsg: string;
}

interface ChatListProps {
  chats: ChatData[];
}

const ChatList: React.FC<ChatListProps> = ({ chats }) => {

  const navigate = useNavigate()
  const handleClick = (value:string) => {
  navigate('/chat', { state: { value } })
  }
  
  return (
    <div className='flex flex-col w-[300px] h-full bg-white'>
      <div className='h-15 flex items-center bg-white border-b p-3'>
        <h1 className='text-2xl font-black'>Chats</h1>
      </div>

      <div className='overflow-y-auto'>
      {chats.map((chat) => (
        <button
          onClick={() => handleClick(chat.userName)}
          className="w-full"
        >
          <ChatItem
            userName={chat.userName}
            lastMsg={chat.lastMsg}
            lastMsgTime={chat.lastMsgTime}
          />
        </button>
      ))}
      </div>
    </div>
  );
};

export default ChatList;
