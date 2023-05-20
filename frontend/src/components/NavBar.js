import React from 'react';
import {Link, useLocation} from 'react-router-dom'

function NavBar({onLogOut, email, isOpen, onBurgerClick}) {
  const location = useLocation();
  function navLinkToggle() {
    if(location.pathname === "/sign-up") {
      return(<Link className="header__link" to="/sign-in">Войти</Link>);
    } else if(location.pathname === "/sign-in") {
      return(<Link className="header__link" to="/sign-up">Регистрация</Link>);
    } else {
      return (
        <>
        <p className='header__user-email'>{email}</p>
        <button className='header__logout-btn' type='button' onClick={onLogOut}>Выйти</button>
        <button className={`header__burger-btn ${isOpen ? 'header__burger-btn_close' : ''}`} type='button' onClick={onBurgerClick}></button>
        </>
      );
    }
  }

  return (
    <div className="header__nav">{navLinkToggle()}</div>
  );
}

export default NavBar;
