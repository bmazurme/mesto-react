function Card(props) {
  return(
    <div className="element">
    <button aria-label="Remove" className="element__remove" type="button"></button>
    <img className="element__image" 
         alt={props.card.name} 
         onClick={()=>props.onCardClick(props.card)} 
         src={props.card.link}
         />
    <div className="element__group">
      <h2 className="element__name">{props.card.name}</h2>

      <div className="element__column">
        <button aria-label="Like" className="element__like" name="button-like"></button>
        <p className="element__counter">{props.card.likes.length}</p>
      </div>

    </div>
  </div>   
  );
}

export default Card;