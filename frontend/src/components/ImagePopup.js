import React from 'react';

function ImagePopup({card, onClose}) {
    return (
      <div> 
        <section className={`popup popup_open-img ${card ? `popup_opened` : ''}`}>
          <div className="popup__img-container">
            <button className="popup__close-button" type="button" onClick = {onClose}></button>
            <img className="popup__image" src={card?.link} alt={card?.name}/>
            <p className="popup__img-description">{card?.name}</p>
          </div>
        </section>
      </div>
    );
}

export default ImagePopup;