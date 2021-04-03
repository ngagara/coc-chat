import React from "react";

import './Chat.css';

import emodji from '../../icons/emodji.svg';

import { Context } from '../../contexts/Contexts';

function Footer( { sendMessage, setMessage } ) {

  const context = React.useContext(Context);
  const minimize = context.minimize;

  return (
    <div className={`chat__footer`} style={ minimize ? {display: 'none'} : {display: 'flex'}}>
      <input className="chat__input" onChange={setMessage} onKeyPress={sendMessage} type="text" name="text" minLength="1" maxLength="200" placeholder="Напишите сообщение..."/>
      <button className="button chat__emodji-button">
        <img className="chat__emodji-icon" src={emodji} alt=""/>
      </button>
   </div>
  );
}

export default Footer;
