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

      const { data, error } =  await supabase
        .from('messages')
        .select('*')
        .eq('sender_id', senderId)
        .order('created_at', { ascending : true });


      if (data && data.length > 0){
        setLastDate(data[data.length - 1]?.created_at);
        setLastMessage(data[data.length - 1]?.content);
        console.log('Последняя дата сообщения:', lastDate);
      }
      
      if (error) {
        console.error('Ошибка при получении сообщений:', error)
      } else {
        console.log('Сообщения:', data[0]);
      }
  

      
      
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

  if (chatPartner) {
    return <ChatRoom currentUser={currentUser} partner={chatPartner} goBack={() => setChatPartner(null)} />;
  }



  return (
    <div className="p-4">
      <h2 className="text-3xl mb-4 font-bold">Chats</h2>
      <ul className=''>
        {users.map(user => (
          <li key={user.id} className="flex justify-between items-center mb-2 gap-2 ">
            <button
              className="bg-white border-1 px-2 py-1 rounded flex flex-col"
              onClick={() => setChatPartner(user)}
            >
              <span className='text-black font-bold'>{user.username}</span>
              <span className='text-gray-400'>{formatted}</span>
              <span>{lastMessage}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
