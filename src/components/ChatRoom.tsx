//chatroom.tsx
import { useState } from 'react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import BasicMenu from "./BasicMenu"
import Message from './Message';

function ChatRoom() {
  const [msg, setMsg] = useState('')
  return (
    <div className="flex flex-col flex-1 h-full bg-yellow-300">
      <div className="bg-white flex justify-between h-16 items-center px-3">
        <div className="flex items-center gap-2">
          <img src="../../avatar.png" alt="userAvatar" className='w-10 h-10 rounded-full object-cover' />
          <h1>UserName</h1>
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
        <div className='flex-1 overflow-y-auto p-4'>
          <Message />
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