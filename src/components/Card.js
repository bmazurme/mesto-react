import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardDeleteButtonClassName = (
    `element__remove ${isOwn ? 'element__remove_visible' : ''}` 
  ); 
  const cardLikeButtonClassName = (
    `element__like ${isLiked ? 'element__like_checked' : ''}`
  ); 

  return(
    <div className="element">
      <button onClick={() => props.onCardDelete(props.card)} 
              aria-label="Remove" 
              className={cardDeleteButtonClassName} 
              type="button"
      />
      <img className="element__image" 
          alt={props.card.name} 
          onClick={()=>props.onCardClick(props.card)} 
          src={props.card.link}
      />
      <div className="element__group">
        <h2 className="element__name">{props.card.name}</h2>
        <div className="element__column">
          <button onClick={()=>props.onCardLike(props.card)} 
                  aria-label="Like" 
                  className={cardLikeButtonClassName}
                  name="button-like"
          />
        <p className="element__counter">{props.card.likes.length}</p>
      </div>
    </div>
  </div>   
  );
}

export default Card;