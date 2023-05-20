import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onClose, onAddPlace, isLoading}) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  const handlePlaceNameChange = (e) => {
    setName(e.target.value)
 }

  const handleLinkChange = (e) => {
    setLink(e.target.value)
 }

 React.useEffect(() => {
  setName('');
  setLink('');
}, [isOpen]); 

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace({name, link});
  }
  
  return (
    <div>
      <PopupWithForm
      title = "Новое место"
      name = "add-cards"
      isOpen = {isOpen}
      onClose = {onClose}
      onSubmit = {handleSubmit}
      buttonState = {isLoading ? 'Сохранение...' : 'Сохранить'}
      >
          <input
              type="text"
              className="popup__form-edit popup__form-edit_substitution_name popup__form-edit_name"
              name="caption-input"
              id='caption-input'
              form="popup-add"
              required
              placeholder="Название"
              minLength="2"
              maxLength="30"
              value={name}
              onChange = {handlePlaceNameChange}
              />
          <span className="caption-input-error popup__form-error"></span>
          <input
              type="url"
              className="popup__form-edit popup__form-edit_substitution_about-me popup__form-edit_link"
              name="link-input"
              id='link-input'
              form="popup-add"
              required
              placeholder="Ссылка на картинку"
              value={link}
              onChange = {handleLinkChange}
              />
          <span className="link-input-error popup__form-error"></span>
      </PopupWithForm>
    </div>
  );
}

export default AddPlacePopup;