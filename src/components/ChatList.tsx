import { useEffect, useState } from 'react';
import { supabase } from '../supabase/client';
import ChatRoom from './ChatRoom';

interface ChatPreview {
  chat_id: string;
  partner_id: string;
  partner_username: string;
  last_content: string | null;
  last_created_at: string | null;
}

export default function UsersList() {
  const [chatList, setChatList] = useState<ChatPreview[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [chatPartner, setChatPartner] = useState<any | null>(null);

  // Получаем текущего пользователя
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) console.error('Ошибка авторизации:', error);
      else setCurrentUser(user);
    };

    fetchCurrentUser();
  }, []);

  // Получаем список чатов через RPC
  useEffect(() => {
    const fetchChatList = async () => {
      if (!currentUser?.id) return;

      const { data, error } = await supabase.rpc(
        'get_chatlist_with_last_message',
        { user_id: currentUser.id }
      );

      if (error) {
        console.error('Ошибка загрузки чатов:', error);
      } else {
        setChatList(data);
      }
    };

    fetchChatList();
  }, [currentUser]);

  if (!currentUser) return <p>Загрузка...</p>;

  return (
    <div className="flex h-screen bg-amber-50">
      {/* Список чатов */}
      <div className="w-1/4 flex flex-col border-r border-gray-300 bg-white">
        <h2 className="text-3xl pb-4 font-bold pl-4 pt-2 border-b">Chats</h2>
        <ul className="h-full overflow-y-auto">
          {chatList.map(user => (
            <li key={user.chat_id} className="p-2">
              <button
                className="flex flex-col items-start w-full bg-white hover:bg-gray-100 border rounded-lg px-3 py-2"
                onClick={() =>
                  setChatPartner({ id: user.partner_id, username: user.partner_username })
                }
              >
                <div className="flex flex-row justify-between w-full mb-1">
                  <span className="text-black font-semibold">{user.partner_username}</span>
                  <span className="text-sm text-gray-500">
                    {user.last_created_at
                      ? new Date(user.last_created_at).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : ''}
                  </span>
                </div>
                <div className="text-gray-600 text-sm truncate">
                  <span className="font-bold">
                    {user.partner_id === currentUser.id ? 'Guest: ' : 'Me: '}
                  </span>
                  {user.last_content || 'Нет сообщений'}
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Открытое окно чата */}
      <div className="flex-1 h-full">
          <ChatRoom
            currentUser={currentUser}
            partner={chatPartner}
            goBack={() => setChatPartner(null)}
          />
      </div>
    </div>
  );
}
