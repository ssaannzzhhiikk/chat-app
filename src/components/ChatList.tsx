import { useEffect, useState } from 'react';
import { supabase } from '../supabase/client'; // ваш экспортированный клиент
import ChatWindow from './ChatRoom';

export default function UsersList() {
  const [users, setUsers] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [chatPartner, setChatPartner] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user);

      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, username')
        .neq('id', user?.id); // исключить самого себя

      setUsers(profiles || []);
    };
    fetchData();
  }, []);

  if (!currentUser) return <p>Загрузка...</p>;

  if (chatPartner) {
    return <ChatWindow currentUser={currentUser} partner={chatPartner} goBack={() => setChatPartner(null)} />;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Пользователи</h2>
      <ul>
        {users.map(user => (
          <li key={user.id} className="flex justify-between items-center mb-2">
            <span>{user.username}</span>
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded"
              onClick={() => setChatPartner(user)}
            >
              Написать
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
