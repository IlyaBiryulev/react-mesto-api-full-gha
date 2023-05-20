import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup({isOpen, onClose, onUpdateUser, isLoading}) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const currentUser = React.useContext(CurrentUserContext);

  const handleChangeName = (e) => {
    setName(e.target.value);
 }

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
 }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]); 

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <div>
      <PopupWithForm
      title = "Редактировать профиль"
      name = "profile-edit"
      isOpen = {isOpen}
      onClose = {onClose}
      onSubmit = {handleSubmit}
      buttonState = {isLoading ? 'Сохранение...' : 'Сохранить'}
      >
          <input
              type="text"
              className = "popup__form-edit popup__form-edit_substitution_name"
              name="name"
              id='name-input'
              form="profile-edit"
              required
              placeholder="Введите имя"
              minLength="2"
              maxLength="40"
              value = {name}
              onChange = {handleChangeName}/>
          <span className="name-input-error popup__form-error"></span>
          <input
              type="text"
              className = "popup__form-edit popup__form-edit_substitution_about-me"
              name="job"
              id='job-input'
              form="profile-edit"
              required
              placeholder="Введите о себе"
              minLength="2"
              maxLength="200"
              value = {description}
              onChange = {handleChangeDescription}/>
          <span className = "job-input-error popup__form-error"></span>
      </PopupWithForm>
    </div>
  );
}

export default EditProfilePopup;