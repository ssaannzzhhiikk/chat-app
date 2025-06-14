//chatroom.tsx
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import BasicMenu from "./BasicMenu"
import Message from './Message';

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';


interface ChatData {
  userName: string;
  lastMsgTime: string;
  lastMsg: string;
}

interface ChatRoomProps {
  data: ChatData[];
}

const ChatRoom: React.FC<ChatRoomProps> = ({ data }) => {
  const [msg, setMsg] = useState('')
  const location = useLocation();
  const { value } = location.state || {};
  
  
  let message : string = "Select a chat to start messaging";
  let name:string = "";
  let time:string = "";


  data.map((chat)=>{
    if (chat.userName === value) {
      message = chat.lastMsg
      name = chat.userName
      time = chat.lastMsgTime
    }
  })


  return (
    <div className="flex flex-col flex-1 h-full bg-blue-200">
      <div className="bg-white flex justify-between h-16 items-center px-3">
        <div className="flex items-center gap-2">
          <img src="../../avatar.png" alt="userAvatar" className='w-10 h-10 rounded-full object-cover' />
          <h1>{name}</h1>
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


      
      <div className='flex flex-col h-full max-h-screen'>
        <div className='flex flex-col-reverse items-end flex-1 overflow-y-auto p-4'>
          <div className='border-1 bg-white rounded-lg '>
            <Message
            userName={name}
            lastMsg={message}
            lastMsgTime={time}
            />
          </div>



        </div>

        <div className='p-4 border-t bg-white flex gap-2'>
          <input type="text" 
          placeholder="Type a message..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          className='w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5'

          />
          <button className=' hover:bg-gray-200 w-10 h-10 rounded-full'>
            <SendRoundedIcon />
          </button>
        </div>
      </div>



      

    </div>
  )
}

export default ChatRoom