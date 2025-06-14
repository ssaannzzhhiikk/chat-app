import React from 'react'


interface SendedMsgProps {
  userName: string;
  lastMsgTime: string;
  lastMsg: string;
}


const Message: React.FC<SendedMsgProps> = ({ lastMsg, lastMsgTime, userName }) => {

  return (
    <div className=''>
      {lastMsgTime}
      {lastMsg}
      {userName}
    </div>

  )
}

export default Message