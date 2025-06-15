//chat.tsx
import ChatList from '../components/ChatList';
import ChatRoom from '../components/ChatRoom';


export default function Chat() {
  return (
    <div className='flex h-full'>
      <ChatList />
      <ChatRoom />
    </div>
    
    
  );
}
