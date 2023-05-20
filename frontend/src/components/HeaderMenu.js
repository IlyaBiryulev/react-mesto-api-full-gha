import React from 'react';
import Header from './Header';
import BurgerMenu from './BurgerMenu';

function HeaderMenu({isOpen, onBurgerClick, onLogOut, email}) {
  return(
    <>
      <BurgerMenu
        isOpen={isOpen}
        onLogOut={onLogOut}
        email={email}
      />
      <Header
        isOpen={isOpen}
        onBurgerClick={onBurgerClick}
        onLogOut={onLogOut}
        email={email}
      />
    </>
  );
}

export default HeaderMenu;
