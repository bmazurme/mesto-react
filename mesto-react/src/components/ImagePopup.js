function ImagePopup(props) {
  return(
    <div className={`popup popup_type_slide popup_image ${props.card && 'popup_active'}`}>
      <div className="popup__container popup__container_image">
        <button aria-label="Close" className="popup__close" type="button" onClick={props.onClose}></button>
        <div className="slide">
          <img src={props.card ? props.card.link : ''} alt={props.card ? props.card.name : ''}
            className="slide__image"/>
          <p className="slide__name">{props.card ? props.card.name : ''}</p>
        </div>
      </div>
    </div>
  ); 
}

export default ImagePopup;