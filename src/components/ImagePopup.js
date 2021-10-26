import React from 'react';

function ImagePopup(props) {
    return (
        <section className={`popup popup_image ${props.isOpen}`}>
        <figure className="popup__container-image">
            <button className="popup__close popup__close_js_image" type="button" onClick={props.onClose}></button>
            <img className='popup__image-photo' src={props.card.url} alt={props.card.title} onClick={props.onImagePopup}/>
            <figcaption className='popup__image-title'>{props.card.title}</figcaption>
        </figure>
         </section>
    );
  }


  export default ImagePopup