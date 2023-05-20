import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import Header from './Header.js';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, cards}) {

  const currentUser = React.useContext(CurrentUserContext);

  const cardElement = cards.map((card) => (
    <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
  ))

  return (
    <div>
      <main className="content">
        <section className="profile">
          <button className="profile__avatar-update-button" type="button" onClick = {onEditAvatar}>
            <img
            src={currentUser.avatar}
            alt="Фотография профиля"
            className="profile__image"/>
            </button>
          <div className="profile__info">
            <div className="profile__edit-info">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button className="profile__edit-button" type="button" onClick = {onEditProfile}></button>
            </div>
            <p className="profile__about-me">{currentUser.about}</p>
          </div>
          <button className="profile__add-button" type="button" onClick = {onAddPlace}></button>
        </section>
        <section className="photo-grid">
          {cardElement}
        </section>
      </main>
    </div>
  );
}

export default Main;
