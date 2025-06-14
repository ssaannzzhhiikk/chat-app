interface ChatItemProps {
  userName: string;
  lastMsgTime: string;
  lastMsg: string;
}

const ChatItem: React.FC<ChatItemProps> = ({ userName, lastMsg, lastMsgTime }) => {
  return (
    <div className="flex justify-between items-center border-b p-2 hover:bg-gray-200 w-full">
      
      <div className="flex items-center gap-3">
        <img
          src="../../avatar.png"
          alt="userAvatar"
          className="w-10 h-10 rounded-full object-cover"
        />

        <div className="flex flex-col items-start ">
          <div className="flex justify-between w-[200px]">
            <h1 className="text-base font-semibold">{userName}</h1>
            <p className="text-xs text-gray-500 whitespace-nowrap">{lastMsgTime}</p>
          </div>
          <p className="text-sm text-gray-400">{lastMsg}</p>
        </div>
      </div>
    </div>
  );
};


export default ChatItem;
