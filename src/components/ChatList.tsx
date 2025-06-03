import ChatItem from './ChatItem';
import React from 'react';

interface ChatData {
  userName: string;
  lastMsgTime: string;
  lastMsg: string;
}

interface ChatListProps {
  chats: ChatData[];
}

const ChatList: React.FC<ChatListProps> = ({ chats }) => {
  return (
    <div className='flex flex-col h-screen w-1/5 bg-blue-500'>
      <div className='h-15 flex items-center bg-white border-b p-3'>
        <h1 className='text-2xl font-black'>Chats</h1>
      </div>

      <div className='overflow-y-auto'>
        {chats.map((chat, index) => (
          <ChatItem
            key={index}
            userName={chat.userName}
            lastMsg={chat.lastMsg}
            lastMsgTime={chat.lastMsgTime}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatList;
