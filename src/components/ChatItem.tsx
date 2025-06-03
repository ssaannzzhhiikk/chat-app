interface ChatItemProps {
  userName: string;
  lastMsgTime: string;
  lastMsg: string;
}

const ChatItem: React.FC<ChatItemProps> = ({ userName, lastMsg, lastMsgTime }) => {
  return (
    <div className='bg-white grid grid-cols-[1fr_3fr_1fr] border-b gap-2 items-center p-2'>
      <div className='flex justify-center items-center'>
        <img src="../../public/avatar.png" alt="userAvatar" className='w-10 h-10 rounded-full object-cover' />
      </div>

      <div>
        <h1 className='text-base font-semibold'>{userName}</h1>
        <p className='text-sm text-gray-400'>{lastMsg}</p>
      </div>

      <p className='text-xs text-gray-500'>{lastMsgTime}</p>
    </div>
  );
};

export default ChatItem;
