import React, {useRef, useEffect} from "react";

import '../../../Chat/Chat.css';

import BTC from '../../../../icons/BTC.svg';
// import ADA from '../../../../icons/ADA.svg';
// import admin_badge from '../../../../icons/admin_badge.svg';
// import moderator_badge from '../../../../icons/moderator_badge.svg';

import Message from '../../Message';
import UserMessage from '../../UserMessage';

import { Context } from '../../../../contexts/Contexts';

const General = ({ lang, scrollHandler }) => {

  const messagesEndRef = useRef(null);

  const context = React.useContext(Context);
  const messages = context.messages;
  const userMessage = context.userMessage;

  function formatDate(date) {
    return date.substr(11, 5);
  };

  useEffect(() => {
      // messagesEndRef.current.scrollIntoView({ block: "end" });
  }, [messages]);

  return (
    <div className="chat__container chat__container_general" onScroll={scrollHandler}>
      { lang === 'RU' ?
      <>
        { messages && messages.map((item) => ( 
          item.from === userMessage.from ?  
          <UserMessage key={item.id} text={item.text} time={formatDate(item.createdAt)}/> :
          <Message key={item.id} name={item.from} userBadge={BTC} time={formatDate(item.createdAt)} text={item.text}/>
        ))}
      </> 
      : 
      <>
        { messages && messages.map((item) => ( 
          item.from === userMessage.from ?  
          <UserMessage key={item.id} text={item.text} time={formatDate(item.createdAt)}/> : null
        ))}
      </> 
      }
      <div className="chat__fake-div" ref={messagesEndRef} />
    </div>
  );
};

export default General;
