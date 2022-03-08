import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState();

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
    setSelectedCard(null);
  }

  return (
      <div className="page">
      <Header/>
      <Main onEditProfile={handleEditProfileClick} 
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            />   
      <Footer/>   

      <PopupWithForm title="Редактировать профиль" name="edit" buttonText="Сохранить" 
        isOpen={isEditProfilePopupOpen}  onClose={closeAllPopups}>
        <div className="form__box">
        <input placeholder="Имя" className="form__input form__input_type_name" name="name" 
          required minLength="2" maxLength="40" id="name-input" defaultValue="Жак-Ив Кусто"></input>
          <span className="name-input-error form__input-error"></span>
        </div>

        <div className="form__box">
        <input placeholder="Профессия" className="form__input form__input_type_profession" name="profession"
          required minLength="2" maxLength="200" id="profession-input" defaultValue="Исследователь океана"></input>
          <span className="profession-input-error form__input-error"></span>
        </div>
      </PopupWithForm>

      <PopupWithForm title="Новое место" name="place" buttonText="Создать" 
        isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
        <div className="form__box">
          <input placeholder="Название" className="form__input form__input_type_name"
            required minLength="2" maxLength="30" name="name" id="nameCard-input"></input>
            <span className="nameCard-input-error form__input-error"></span>
        </div>
            
        <div className="form__box">
          <input placeholder="Ссылка на картинку" name="link" className="form__input
            form__input_type_link" id="link-input" required type="url"></input>
          <span className="link-input-error form__input-error"></span>
        </div>
      </PopupWithForm>

      <PopupWithForm title="Обновить аватар" name="avatar" buttonText="Сохранить" 
        isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
        <div className="form__box">
          <input placeholder="Ссылка на картинку" name="avatar" className="form__input
            form__input_type_link" id="avatar-input" required type="url"></input>
          <span className="avatar-input-error form__input-error"></span>
        </div>
      </PopupWithForm>

      <ImagePopup card={selectedCard} onClose={closeAllPopups}/>

    </div>
  );
}

export default App;