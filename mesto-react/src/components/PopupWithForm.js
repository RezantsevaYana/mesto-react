import React from 'react';

function PopupWithForm(props) {
    return (
        <section className= {`popup popup${props.name} ${props.isOpen}`}>
            <div className={`popup__container popup__container${props.name}`}>
                <button className={`popup__close popup__close${props.name}`} type="button" onClick={props.onClose}></button>
                <h2 className={`popup__title popup__title${props.name}`}>{props.title}</h2>
                <form className={`popup__form popup__form${props.name}`} name={props.name}>
                    {props.children}
                </form>
            </div>
        </section>
    );
  }


  export default PopupWithForm