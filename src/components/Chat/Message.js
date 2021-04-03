import './Chat.css';

import React, { useState, useEffect } from "react";

function Message({ name, userBadge, statusBadge, text, time }) {

  const [isLevel, setLevel] = useState(0);

  useEffect(()=>{
    const rand = 1 + Math.random() * (10 - 1);
    setLevel(Math.floor(rand))
  },[])

  return (
    <div className="chat__message-container">
      <div className="chat__message">
          <div className="chat__message-header">
            <img className="chat__user-badge" src={userBadge} alt="Значок Юзера"/>
            <p className="chat__user-name">{name}</p>
            <p className="chat__user-level">{isLevel}</p>
            {statusBadge && <img className="chat__status-badge" src={statusBadge} alt="Статус"/>}
          </div>
          <p className="chat__message-text">{text}</p>
      </div>
      <p className="chat__message-time">{time}</p>
    </div>
  );
}

export default Message;
