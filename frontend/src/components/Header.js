import React from 'react';
import NavBar from './NavBar';

function Header({onLogOut, email, isOpen, onBurgerClick}) {
  return (
    <div>
      <header className="header">
        <div className="header__logo"></div>
        <NavBar
          onLogOut={onLogOut}
          email={email}
          isOpen={isOpen}
          onBurgerClick={onBurgerClick}
        />
      </header>
    </div>
  );
}

export default Header;
