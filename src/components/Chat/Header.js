import './Chat.css';

import React from "react";

import arrow from '../../icons/arrow.svg';
import arrow_s from '../../icons/arrow_s.svg';
import enlarge from '../../icons/enlarge.svg';
import minimize from '../../icons/minimize.svg';

import { Context } from '../../contexts/Contexts';

import Dropdown from './Dropdown'

function Header({ goTo, lang, handleMinimize, handleEnlarge, handSelectedLang, handleShiftNav, handleActiveDropdown, isShift, isActive }) {

  const context = React.useContext(Context);
  const large = context.enlarge;
  const miniSize = context.minimize;
  const nav = context.NAV; 

  return (

    <div className={`chat__header ${ large  ? "chat__header_b-size" : ""}`}>
     <nav className={`chat__nav ${ large  ? "chat__nav_b-size" : ""}`}>
       <ul className={`chat__links ${ isShift ? "chat__links_shift" : ""}  ${ large  ? "chat__links_b-size" : ""}`}>
         { Object.values(nav).map(item => (
           item.lang === lang && item.options.map((item, index) => ( <li key={index} onClick={()=>{goTo(item)}} className={`chat__link ${ item.status ? 'chat__link_active' : ''}`}>{item.title}</li>))
         ))}     
       </ul>
     </nav>
     <button className="button chat__arrow-button" style={ large ? {display:'none'} : {display:'block'}} onClick={handleShiftNav}>
       <img className="chat__arrow-icon chat__arrow-icon_nav" src={arrow} alt=""/>
     </button>
     <div className="chat__drop-wrapper">
       <p className="chat__drop-lang chat__drop-lang_selected">{lang}</p>
        <button className={`button chat__arrow-button ${isActive ? 'chat__arrow-button_drop' : ''}`} onClick={handleActiveDropdown} disabled={miniSize}>
         <img className="chat__arrow-icon" src={arrow_s} alt=""/>
        </button>
        <Dropdown isActive={isActive} handSelectedLang={handSelectedLang}/>
     </div>
     <div className="chat__size-container">
     <button className="button chat__minimize-button" onClick={handleMinimize}>
        <img className="chat__minimize-icon" src={minimize} alt=""/>
       </button>
      <button className="button chat__enlarge-button">
        <img className="chat__enlarge-icon" src={enlarge} onClick={handleEnlarge} alt=""/>
      </button>
     </div>
    </div>
  );
}

export default Header;
