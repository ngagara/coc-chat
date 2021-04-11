import React, { useState, useEffect } from "react";
import { Context } from '../../contexts/Contexts';
import { NAV } from '../../constants/constants'

import Header from './Header'
import Main from './Main/Main';

import api from '../../utils/api'
import socket from '../../utils/socket'

import './Chat.css';

const Chat = React.memo(() => {

 const [link, setLink] = useState('general');
 const [lang, setLang] = useState('RU');
 const [messages, setMessages] = useState([]);
 const [userName, setUserName] = useState('GG_nf');
 const [minimize, setMinimize] = useState(false);
 const [enlarge, setEnlarge] = useState(false);
 const [isActive, setActive] = useState(false);
 const [isShift, setShift] = useState(false);
 const [limit, setLimit] = useState(15);
 const [skip, setSkip] = useState(0);
 const [userMessage, setUserMessage] = useState(
   {
      "from": `${userName}`,
      "text": "",
    }
  );

  useEffect(() => {
    api.getMessages(limit, skip).then((messages) => {
      setMessages(messages);
     });
  },[]);

  useEffect(() => {
    socket.addEventListener('message', (message) => {
      setMessages(prevState => ([message, ...prevState]));
    });
  },[]);

  useEffect(() => {
    api.getMessages(limit, skip).then((messages) => {
    //  setMessages(prevState => [...prevState, ...messages]);
        setMessages(messages);
    });
  },[limit]);


  let scrollHandler = (e) => {
    if ( e.target.scrollHeight - Math.floor(Math.abs(e.target.scrollTop)) <= 322) {
      setLimit(prevState => prevState + 15);
    } 
  }; 

 let sendMessage = (e) => {

  if (e.target.value < 1) {
    return
  }

  if (e.key === 'Enter') {

    socket.emit("message", userMessage, (err) => {
      if (err) {
        console.error(err);
      } else {
       api.getMessages(limit, skip).then((messages) =>{
        setMessages(messages);
       });
        console.log("success");
      }
    });

    e.target.value = ''

  }
  };

  let setMessage = (e) => {
    setUserMessage(prevState => ({
      ...prevState,
      "text": e.target.value
      }
    ))
  }
 
 let setActivePage = (page) => {
  if (page.status === false) {
    Object.values(NAV).map(item => {
     return item.options.map(item => {
        return item.status = false
      })
    })
   page.status = !page.status
 } 
 }

  let goTo = (page) => {
    setLink(page.to);
    setActivePage(page)
  }

  let handleMinimize = () => {
    setMinimize(!minimize);
    setEnlarge(false);
    setActive(false);
  }; 

  let handleEnlarge = () => {
    setEnlarge(!enlarge);
    setMinimize(false);
  };

  let handleActiveDropdown = () => {
    setActive(!isActive)
  }  
  
  let handleShiftNav = () => {
    setShift(!isShift)
  } 

  let handSelectedLang = (lang) => {
    setLang(lang);
    setActive(!isActive);
    setShift(false)
    return Object.values(NAV).map(item => {
      return item.options.map(item => {
        if( link === item.to ) {
         return item.status = true
        } else {
          return item.status = false
        }
       })
     })
  }

  return (
    <Context.Provider value={{messages, userMessage, userName, minimize, enlarge, NAV, link, lang}}>
     <aside className={`chat ${ enlarge ? "chat_b-size" : ""}`}>
      <Header 
       goTo={goTo}
       lang={lang}
       setLang={setLang}
       handleMinimize={handleMinimize}
       handleEnlarge={handleEnlarge}
       handSelectedLang={handSelectedLang}
       handleShiftNav={handleShiftNav}
       handleActiveDropdown={handleActiveDropdown}
       isShift={isShift}
       isActive={isActive}
       />
      <Main setMessage={setMessage} sendMessage={sendMessage} scrollHandler={scrollHandler}/>
    </aside>
    </Context.Provider>
  );
});

export default Chat;
