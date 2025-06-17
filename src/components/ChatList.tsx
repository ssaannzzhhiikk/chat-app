import { useEffect, useState } from 'react';
import { supabase } from '../supabase/client';
import ChatRoom from './ChatRoom';

export default function UsersList() {
  const [users, setUsers] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [chatPartner, setChatPartner] = useState<any | null>(null);
  const [lastMessage, setLastMessage] = useState<any[]>([]);
  const [senderId, setSenderId ] = useState<string | null>(null);
  const [lastDate, setLastDate] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user);

      if (user?.id) {
        setSenderId(user.id);
      }

      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, username')
        .neq('id', user?.id); // исключить самого себя

      setUsers(profiles || []);
    };
    fetchData();
  }, []);

  useEffect(()=>{
    const fetchMessages = async () => {
      if(!senderId) return;

      const { data } =  await supabase
        .from('messages')
        .select('*')
        .eq('sender_id', senderId)
        .order('created_at', { ascending : true });

      if (data && data.length > 0){
        setLastDate(data[data.length - 1]?.created_at);
        setLastMessage(data[data.length - 1]?.content);
        //console.log('Последняя дата сообщения:', lastDate);
      }
      
      {/*
      if (error) {
        console.error('Ошибка при получении сообщений:', error)
      } else {
        console.log('Сообщения:', data[0]);
      }
      */}
  

      
      
    };
    fetchMessages();

  }, [senderId]);

  const formatted = lastDate
  ? new Date(lastDate).toLocaleString('ru-RU', {
      day: '2-digit',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit'
    })
  : '';

  if (!currentUser) return <p>Загрузка...</p>;

  {/*
    if (chatPartner) {
    return <ChatRoom currentUser={currentUser} partner={chatPartner} goBack={() => setChatPartner(null)} />;
    }
  */}
  



  return (
    <div className="flex h-screen bg-amber-50">
      <div className='w-1-4 flex flex-col'>
        <h2 className="text-3xl pb-5 font-bold pl-4 pt-2 w-full border-b-1 ">Chats</h2>
        <ul className='h-full overflow-y-auto'>
          {users.map(user => (
            <li key={user.id} className="flex items-center gap-2 p-2 ">
              <button
                className="flex flex-col items-start w-full bg-white hover:bg-gray-100 border-1  rounded-lg px-2 py-1 "
                onClick={() => setChatPartner(user)}
              >
                <div className='flex flex-row w-full gap-4 justify-between'>
                  <span className='text-black font-bold'>{user.username}</span>
                  <span className='text-gray-400'>{formatted}</span>
                </div>
                <div>
                  <span className='font-bold'>{senderId === user.id ? "Guest: " : "Me: "}</span>
                  <span className='text-gray-400'>{lastMessage}</span>
                </div>
                
              </button>
            </li>
          ))}
      </ul>
      </div>

      <div className='h-full flex-1'>
        <ChatRoom currentUser={currentUser} partner={chatPartner} goBack={() => setChatPartner(null)} />
      </div>
    </div>

  );
}
