import React from "react";

import '../Chat.css';

import General from '../Main/routs/General';
import Clan from '../Main/routs/Clan';
import Friends from '../Main/routs/Friends';
import News from '../Main/routs/News';
import Footer from '../Footer';

import { Context } from '../../../contexts/Contexts';

function Main({ setMessage, sendMessage }) {

  const context = React.useContext(Context);
  const minimize = context.minimize;
  const large = context.enlarge;
  const link = context.link;
  const lang = context.lang;

  return (
    <div className={`chat__main ${ large  ? "chat__main_b-size" : ""}`} style={ minimize ? {display: 'none'} : {display: 'flex'} }>  
      { link === 'general' && lang === 'RU' && 
      <>
      <General lang={lang}/>
      <Footer setMessage={setMessage} sendMessage={sendMessage}/>
      </>
      }
      { link === 'clan' && <Clan/>}
      { link === 'friends' && <Friends/>}
      { link === 'news' && <News/>}
    </div>
  );
}

export default Main;