import React from 'react';

function PopupWithForm({name, title, isOpen, onClose, children, onSubmit, buttonState}) {
    return (
      <div>
        <section className={isOpen ? `popup popup_type_${name} popup_opened` : `popup popup_type_${name}`}>
          <div className="popup__container">
            <h2 className="popup__title">{title}</h2>
            <button className="popup__close-button" type="button" onClick = {onClose}></button>
            <form action="#" className="popup__form popup__form_update-avatar" name={name} id={`popup-${name}`} noValidate onSubmit={onSubmit}>
              {children}
              <button className="popup__submit-button" type="submit">{buttonState}</button>
            </form>
          </div>
        </section>
      </div>
    );
}

export default PopupWithForm;
