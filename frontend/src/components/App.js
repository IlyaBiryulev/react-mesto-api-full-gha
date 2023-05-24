import React, { useEffect } from 'react';
import {Route, Routes, useNavigate } from 'react-router-dom';

import '../index.css'
import Main from './Main.js';
import Footer from './Footer.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ImagePopup from './ImagePopup.js';
/* import {api} from '../utils/Api.js'; */
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRouteElement from './ProtectedRoute';
import HeaderMenu from './HeaderMenu';

import * as api from '../utils/Api.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupLoading, setIsEditProfilePopupLoading] = React.useState(false);
  const [isAddPlacePopupLoading, setIsAddPlacePopupLoading] = React.useState(false);
  const [isEditAvatarPopupLoading, setIsEditAvatarPopupLoading] = React.useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({
    "name": '',
    "about": '',
    "avatar": '',
    "_id": '',
    "cohort": ''
  });
  const [cards, setCards] = React.useState([]);

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  const [isRegisterSucces, setIsRegisterSucces] = React.useState(false);

  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = React.useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then((values) => {
      setCurrentUser(values[0])
      setCards(values[1])
    })
    .catch((err) => {
      console.log(err);
    });
    }
  },[loggedIn])

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const handleBurgerMenuClick = () => {
    if(!isBurgerMenuOpen) {
      setIsBurgerMenuOpen(true)
    } else {
      setIsBurgerMenuOpen(false)
    }
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsInfoToolTipOpen(false)
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
    .then((newCard) => {
      console.log(newCard)
      setCards((state) => state.filter((c) => c._id !== card._id));
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const handleUpdateUser = (userData) => {
    setIsEditProfilePopupLoading(true);
    api.setUserInfo(userData)
    .then((value) => {
      setCurrentUser(value)
      closeAllPopups()
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsEditProfilePopupLoading(false);
    });
  }

  const handleUpdateAvatar = (avatarData) => {
    setIsEditAvatarPopupLoading(true)
    api.setUserAvatar(avatarData)
    .then((value) => {
      setCurrentUser(value)
      closeAllPopups()
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsEditAvatarPopupLoading(false)
    });
  }

  const handleAddPlaceSubmit = (cardData) => {
    setIsAddPlacePopupLoading(true)
    api.addCard(cardData)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups()
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsAddPlacePopupLoading(false)
    });
  }

  const handleUserAuthorize = (userData) => {
    setLoading(true);
    api.authorize(userData)
    .then((data) => {
      if (data) {
        setLoggedIn(true);
        setUserEmail(userData.email);
        navigate('/', { replace: true });
      }
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      setLoading(false);
    });
  }

  const handleUserRegister = React.useCallback(
    async ({email, password}) => {
      try {
        const data = await api.register(email, password);
        if (data) {
          setIsRegisterSucces(true);
          setIsInfoToolTipOpen(true);
          navigate('/sign-in', {replace: true})
        } else {
          setIsRegisterSucces(false);
          setIsInfoToolTipOpen(true);
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  const userCheck = React.useCallback(
    async () => {
      try {
        const userData = await api.getContent();
        if (!userData) {
          throw new Error('Данные пользователя отсутствуют')
        }
        setUserEmail(userData.email)
        setLoggedIn(true);
        navigate('/', {replace: true})
      } catch(err) {
        console.error(err)
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  const handleUserLogOut = React.useCallback(async () => {
    try {
      const data = await api.logout();
      if (data) {
        setLoggedIn(false);
        setUserEmail('');
        navigate('/sign-in', { replace: true });
      }
    } catch (err) {
      console.error(err);
    }
  }, [navigate]);


  useEffect(() => {
    userCheck();
  }, [userCheck])

  return (
    <div>
      <CurrentUserContext.Provider value={currentUser}>
        <HeaderMenu
          onLogOut={handleUserLogOut}
          email={userEmail}
          isOpen={isBurgerMenuOpen}
          onBurgerClick={handleBurgerMenuClick}
        ></HeaderMenu>
        <Routes>
          <Route path='/'
          element ={
          <ProtectedRouteElement
            element={Main}
            onEditProfile = {handleEditProfileClick}
            onAddPlace = {handleAddPlaceClick}
            onEditAvatar = {handleEditAvatarClick}
            onCardClick = {handleCardClick}
            onCardLike = {handleCardLike}
            onCardDelete = {handleCardDelete}
            cards = {cards}
            loggedIn ={loggedIn}
          />}
          />
        <Route path='/sign-up' element={<Register
          onRegister = {handleUserRegister}
        />} />
        <Route path='/sign-in' element={<Login
          onLogin = {handleUserAuthorize}
        />} />
        </Routes>
        <Footer />
        <EditProfilePopup
        isOpen = {isEditProfilePopupOpen}
        onClose = {closeAllPopups}
        onUpdateUser = {handleUpdateUser}
        isLoading = {isEditProfilePopupLoading}
        />
        <EditAvatarPopup
        isOpen = {isEditAvatarPopupOpen}
        onClose = {closeAllPopups}
        onUpdateAvatar = {handleUpdateAvatar}
        isLoading = {isEditAvatarPopupLoading}
        />
        <AddPlacePopup
        isOpen = {isAddPlacePopupOpen}
        onClose = {closeAllPopups}
        onAddPlace = {handleAddPlaceSubmit}
        isLoading = {isAddPlacePopupLoading}
        />
        <ImagePopup
        card = {selectedCard}
        onClose = {closeAllPopups}
        />
        <InfoTooltip
        isOpen = {isInfoToolTipOpen}
        onClose = {closeAllPopups}
        isSucces = {isRegisterSucces}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
