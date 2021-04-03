import React, { useState, useEffect } from "react";
import { Context } from '../../contexts/Contexts';
import { NAV } from '../../constants/constants'

import Header from './Header'
import Footer from './Footer';
import Main from './Main/Main';

import api from '../../utils/api'
import socket from '../../utils/socket'

import './Chat.css';

function Chat() {

 const [link, setLink] = useState('general');
 const [lang, setLang] = useState('RU');
 const [messages, setMessages] = useState([]);
 const [userName, setUserName] = useState('GG_nf');
 const [minimize, setMinimize] = useState(false);
 const [enlarge, setEnlarge] = useState(false);
 const [isActive, setActive] = useState(false);
 const [isShift, setShift] = useState(false);
 const [limit, setLimit] = useState(15);
 const [fetching, setFetching] = useState(false);
 const [userMessage, setUserMessage] = useState(
   {
      "from": `${userName}`,
      "text": "",
    }
  );

  useEffect(() => {

    api.getMessages(limit).then((res)=>{
      setMessages(res)
     });

    socket.addEventListener('message', () => {
      api.getMessages(limit).then((res)=>{
        setMessages(res) 
       });
     });

    },[]);

  useEffect(() => {
    if (fetching) {
      api.getMessages(limit).then((res)=>{
        setMessages(res)
       });
    }
    },[fetching]);


  useEffect(() => {
    document.querySelector('.chat__container_general').addEventListener('scroll', scrollHendler);
    return function () {
       document.querySelector('.chat__container_general').addEventListener('scroll', scrollHendler);
    } 
  },[]);

  let scrollHendler = (e) => {
      if ( e.target.scrollHeight - Math.abs(e.target.scrollTop) - e.target.offsetHeight < 1 ) {
        setLimit(prevState => prevState + 15)
        setFetching(true)
      } else {
        setFetching(false)
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
        console.log("success");
        api.getMessages(limit).then((res)=>{
          setMessages(res)
         });
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
      <Main/>
    </aside>
    </Context.Provider>
  );
}

export default Chat;
