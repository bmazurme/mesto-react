import React from 'react';
import Card from './Card';
import api from '../utils/Api';

function Main(props) {
  const [userName, setUserName] = React.useState('Жак-Ив Кусто');
  const [userDescription, setUserDescription] = React.useState('Исследователь океана');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUser().then((userData) => {
      setUserName(userData.name);
      setUserDescription(userData.about);
      setUserAvatar(userData.avatar);
    });

    api.getCards().then((cardData) => {
     setCards(cardData);
    });
  }, []);

  return(
    <main className="main">
      
    <section className="profile">
      <div className="profile__image" 
        style={{ backgroundImage: `url(${userAvatar})` }} 
        onClick={props.onEditAvatar}>
      </div>

      <div className="profile__info">
        <h1 className="profile__name">{userName}</h1>
        <p className="profile__profession">{userDescription}</p>
        <button aria-label="Edit" type="button" className="profile__edit" 
          onClick={props.onEditProfile}></button>
      </div>
      <button aria-label="Add" className="profile__add" type="button" 
        onClick={props.onAddPlace}></button>
    </section>

    <section className="elements">
      {cards.map((card, index) => 
        <Card 
          key={card._id} 
          card={card} 
          onCardClick={props.onCardClick}
        /> 
        )}
    </section>

  </main>
  );
}

export default Main;