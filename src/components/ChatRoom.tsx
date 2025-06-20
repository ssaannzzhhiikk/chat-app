import { useEffect, useState } from 'react';

import BasicMenu from "./BasicMenu"
import { supabase } from '../supabase/client';

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
//import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
//add goBack to chatroom ChatRoom({ currentUser, partner, goBack }: any) 


function ChatRoom({ currentUser, partner }: any) {
  const [chatId, setChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  

  // Find or create chat
  useEffect(() => {
    const setupChat = async () => {
      if (!currentUser?.id || !partner?.id) return;
      const [id1, id2] = [currentUser.id, partner.id].sort();

      const { data : existing } = await supabase
        .from('private_chats')
        .select('*')
        .eq('user1_id', id1)
        .eq('user2_id', id2)
        .maybeSingle();
      
      let chat = existing;

      if (!chat) {
        const { data: newChat } = await supabase 
          .from('private_chats')
          .insert([{user1_id : id1, user2_id : id2}])
          .select()
          .single();

          chat = newChat
      }

      setChatId(chat.id)
    };
    setupChat();
  }, [currentUser?.id, partner?.id])
  

  // Load messages
  useEffect(()=>{
    if (!chatId) return;
    
    const fetchMessages = async () => {
      const {data} = await supabase
        .from('messages')
        .select('*')
        .eq('chat_id', chatId)
        .order('created_at', { ascending : true });
      
        setMessages(data || []);
    };

    fetchMessages();

    //Subsccribe
    const subscription = supabase 
      .channel(`messages-${chatId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `chat_id=eq.${chatId}` },
        payload => {
          setMessages(prev => [...prev, payload.new]);
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(subscription);
    };
  }, [chatId]);


  // Send Message
  const sendMessage = async () => {
    if (input.trim() === '' || !chatId) return;
    await supabase.from('messages').insert([{
      chat_id: chatId,
      sender_id: currentUser.id,
      receiver_id: partner.id,
      content: input
    }])
    setInput("")
  }

  if (!chatId) {
  return (
    <div className="flex items-center justify-center h-full border-l-1">
      <p className='border-1 rounded-lg bg-gray-200 text-black border-black'>Select chat to start messaging </p>
      
    </div>
  );
}


  return (
    <div className="flex flex-col flex-1 h-full bg-amber-50 border-l-1">
      <div className="bg-white border-1 rounded-lg m-2 flex justify-between h-16 items-center px-3">
        <div className="flex items-center gap-2 ">
          {/*
          <button onClick={goBack} className="w-8 h-8 text-black hover:bg-gray-100 rounded-full not-first:">
            <ArrowBackIosNewRoundedIcon />
          </button>
          */}

          
          <img src="../../avatar.png" alt="userAvatar" className='w-10 h-10 rounded-full object-cover' />
          <h1>{partner.username}</h1>
        </div>
        <div className="flex items-center ">
          <SearchRoundedIcon
          sx={{
            "&:hover":{backgroundColor: '#D3D3D3'},
            borderRadius: '50%',
            width: "40px",
            height: "40px",
          }}
          />
          <BasicMenu />
        </div>
      </div>


      
      <div className='flex flex-col h-full max-h-screen overflow-hidden'>
        <div className='flex-1 overflow-y-auto px-4 py-2'>
          <div className=' flex flex-col justify-end w-full bg-amber-50 rounded-lg '>
           
            {messages.map(msg => (
              
              <div key={msg.id} className={`mb-1 ${msg.sender_id === currentUser.id ? 'text-right' : 'text-left'}`}>
                
                <p>{msg.sender_id === currentUser.id ? 'you' : 'guest'}</p>

                <span className={`inline-block px-2 py-1 rounded shadow  ${msg.sender_id === currentUser.id ? 'bg-blue-300' : 'bg-red-200'}`}>
                  <div className='flex gap-4'>
                    <span>{msg.content}</span>
                    <p className='text-gray-400'>
                      {msg.created_at
                        ? new Date(msg.created_at).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : ''}
                    </p>
                  </div>


                </span>

              </div>
            ))}

          </div>
        </div>

        <div className='p-4 m-2 rounded-lg border-1 bg-white flex gap-2'>
          <input type="text" 
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className='w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5'

          />
          <button
            className=' hover:bg-gray-200 w-10 h-10 rounded-full'
            onClick={sendMessage}
            >
            <SendRoundedIcon />
          </button>
        </div>
      </div>



      

    </div>
  )
};

export default ChatRoom