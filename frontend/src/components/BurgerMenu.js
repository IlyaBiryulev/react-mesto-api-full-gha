import React from 'react';

function BurgerMenu({isOpen, email, onLogOut}) {
  return(
    <div className={`burger ${isOpen ? 'burger_opened' : ''}`}>
      <p className='burger__email'>{email}</p>
      <button className='burger__logout-btn' type='button' onClick={onLogOut}>Выйти</button>
    </div>
  );
}

export default BurgerMenu;
