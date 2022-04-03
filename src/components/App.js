import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import PopupWithConfirm from './PopupWithConfirm';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [deletedCard, setDeletedCard] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);

  function escFunction(event){
    if (event.key === "Escape") {
      closeAllPopups();
    }
  }

  React.useEffect(() => {
    api.getUser().then((userData) => {
        setCurrentUser(userData);
    });
    api.getCards().then((cardData) => {
        setCards(cardData);
    })
    .catch((err) => console.log(err));
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    }
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLike(card._id, !isLiked)
    .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => console.log(err));;
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard(null);
  }

  function handleUpdateUser({name, about}) {
    setIsLoading(true);
    api.patchUser({name, about})
       .then((userInfo) => {
        setCurrentUser(userInfo);
        setIsLoading(false);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar({avatar}) {
    setIsLoading(true);
    api.patchAvatar({avatar})
       .then((userInfo) => {
       setCurrentUser(userInfo);
       setIsLoading(false);
       closeAllPopups();
    })
    .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(card) {
    setIsLoading(true);
    api.postCard(card)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      setIsLoading(false);
      closeAllPopups();
    })
    .catch((err) => console.log(err));
  }

  function handleCardDeleteConfirm(card) {
    setIsConfirmPopupOpen(true);
    setDeletedCard(card);
  }

  function handleCardDelete(card) {
    setIsLoading(true);
    api.deleteCard(card._id)
       .then(() => {
          const newCards = cards.filter((_card) => _card!== card);
          setCards(newCards);
          setIsLoading(false);
          closeAllPopups();
       })
      .catch((err) => console.log(err));
  } 

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header/>
        <Main onEditProfile={handleEditProfileClick} 
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              handleCardLike={handleCardLike}
              handleCardDelete={handleCardDeleteConfirm}
              cards={cards}
        />   
        <Footer/>   

        <EditProfilePopup isOpen={isEditProfilePopupOpen} 
                          onClose={closeAllPopups} 
                          onUpdateUser={handleUpdateUser}
                          isLoading={isLoading}
        /> 
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} 
                         onClose={closeAllPopups}
                         onUpdateAvatar={handleUpdateAvatar}
                         isLoading={isLoading}
        />
        <AddPlacePopup isOpen={isAddPlacePopupOpen}
                       onClose={closeAllPopups}
                       onAddPlace={handleAddPlaceSubmit}
                       isLoading={isLoading}
        />
        <ImagePopup card={selectedCard}
                    onClose={closeAllPopups}
        />
        <PopupWithConfirm isOpen={isConfirmPopupOpen}
                          isLoading={isLoading}
                          card={deletedCard}
                          onClose={closeAllPopups}
                          onSubmit={handleCardDelete}
                          title="Вы уверены?"
                          buttonText="Да"
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;