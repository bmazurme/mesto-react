function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_active'}`}>
    <div className="popup__container">
      <button aria-label="Close" className="popup__close" type="button" onClick={props.onClose}></button>
       <form className={`form form_type_${props.name}`} name={`${props.name}-form`} noValidate>
        <h2 className="form__title">{props.title}</h2>
        {props.children}
        <button aria-label="Save" className="form__save form__submit" type="submit">Сохранить</button>
      </form>
    </div>
  </div>
  );
}

export default PopupWithForm; 