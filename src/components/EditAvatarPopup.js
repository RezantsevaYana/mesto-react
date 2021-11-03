import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup(props) {
    
    const editAvatar = React.useRef('');

    function handleSubmit(evt) {
        evt.preventDefault();

        props.onUpdateAvatar({
            avatar: editAvatar.current.value,
        });
    }


    return(
        <PopupWithForm name='-avatar' title='Обновить аватар' isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} buttonText='Сохранить' >
          <input id='link-input' type="url" className="popup__input popup__input_avatar_link" name="link"
                      placeholder="Ссылка на картинку" ref={editAvatar}/>
          <span className='error link-input-error'></span>
          </PopupWithForm>
    )
}

export default EditAvatarPopup;