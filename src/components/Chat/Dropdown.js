import React from "react";

import './Chat.css';

import { Context } from '../../contexts/Contexts';

function Dropdown({ isActive, handSelectedLang }) {

  const context = React.useContext(Context);
  const Navigation = context.NAV;

    return (
      <div className={`chat__drop-container ${isActive ? "chat__drop-container_active" : ""}`}>
        { Navigation && Navigation.map((item, index) => (<p className="chat__drop-lang" key={index} onClick={()=>{handSelectedLang(item.lang)}}>{item.lang}</p>))}
      </div>
    );
  }
  
  export default Dropdown;