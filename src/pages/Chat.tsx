//chat.tsx
import ChatList from '../components/ChatList';
import ChatRoom from '../components/ChatRoom';

export const testlist = [
  { userName: 'Sanzhar', lastMsgTime: '12:15', lastMsg: 'hello' },
  { userName: 'Alex', lastMsgTime: '12:01', lastMsg: 'How are you?' },
  { userName: 'Amina', lastMsgTime: '12:02', lastMsg: 'bebebeb' },
  { userName: 'Alynai', lastMsgTime: '12:03', lastMsg: 'im kringe' },
  { userName: 'Donik', lastMsgTime: '12:04', lastMsg: 'Men dalaga shykpaim' },
  { userName: 'xelA', lastMsgTime: '12:05', lastMsg: 'How are you?' },
  { userName: 'Mirasks', lastMsgTime: '12:06', lastMsg: 'Edward luv' },
  { userName: 'Sanzhar', lastMsgTime: '12:15', lastMsg: 'hello' },
  { userName: 'Alex', lastMsgTime: '12:01', lastMsg: 'How are you?' },
  { userName: 'Amina', lastMsgTime: '12:02', lastMsg: 'bebebeb' },
  { userName: 'Alynai', lastMsgTime: '12:03', lastMsg: 'im kringe' },
  { userName: 'Donik', lastMsgTime: '12:04', lastMsg: 'Men dalaga shykpaim' },
  { userName: 'xelA', lastMsgTime: '12:05', lastMsg: 'How are you?' },
  { userName: 'Mirasks', lastMsgTime: '12:06', lastMsg: 'Edward luv' },
];

export default function Chat() {
  return (
    <div className='flex h-full'>
      <ChatList chats={testlist} />
      <ChatRoom data={testlist} />
    </div>
    
    
  );
}
