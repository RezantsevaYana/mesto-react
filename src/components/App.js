import React from 'react';
//import logo from './logo.svg';
//import '../index.css';
import Header from './Header.js';
import Main from './Main.js'
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js'
import {api} from '../utils/api.js'
import Card from './Card.js'



function App() {

  // переменные состояния для открытия попапов

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false)

  // переменные состояния для сохранения информации о пользователе
  const [userName, setUserName] = React.useState()
  const [userDescription, setUserDescription] = React.useState()
  const [userAvatar, setUserAvatar] = React.useState()

  // переменные состояния для карточек

  const [cards, setCards] = React.useState([])

  const [selectedCard, setSelectedCard] = React.useState({})

  // функции открытия попапов

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  // функция закрытия попапов

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsImagePopupOpen(false)
  }

  
  function handleCardClick(card) {
    setSelectedCard(card)

    setIsImagePopupOpen(true)
  }

  

  // загрузка данных пользователя

  React.useEffect(() => {
    api.getUserInfo()
    .then((profile) => {
      setUserName(profile.name)
      setUserDescription(profile.about)
      setUserAvatar(profile.avatar)
    })
      .catch(err => {
        console.log(err)
      })
  }, [])

  

  // загрузка первоначльной коллекции карточек, один раз при сборке

  React.useEffect(() => {
    api.getInitialCards()
    .then(data => {
      setCards(
        data.map((item) => ({
          id: item._id,
          title: item.name,
          alt: item.name,
          url: item.link,
        }))
      );
    })
    .catch(err => {
      console.log(err)
    })
  }, [])


  return (
    <div className="page">
      <Header />
      <Main onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            cards={cards}
            userName={userName}
            userDescription={userDescription}
            userAvatar={userAvatar}
            onCardClick = {handleCardClick}
      />
      <Footer />
      {isEditProfilePopupOpen ? (
        <PopupWithForm name='_js_editor' title='Редактировать профиль' isOpen='popup_opened' onClose={closeAllPopups}>
        <input id="name-input" type="text" className="popup__input popup__input_info_name" value="" name="name"
                        placeholder="Ваше имя" required minlength="2" maxlength="40"/>
        <span className='error name-input-error'></span>
        <input id="description-input" type="text" className="popup__input popup__input_info_job" value=""
                        name="about" placeholder="Ваш род деятельности" required minlength="2" maxlength="200"/>
        <span className='error description-input-error'></span>
        <button className="popup__button" type="submit">
                        Сохранить
        </button>
      </PopupWithForm>
      ) :
      (
        ''
      ) }

      { isAddPlacePopupOpen ? (
        <PopupWithForm name='_js_item' title='Новое место' isOpen='popup_opened' onClose={closeAllPopups}>
        <input id="title-input" type="text" className="popup__input popup__input_info_title" value=""
                        name="name" placeholder="Название" required minlength="2" maxlength="30"/>
        <span className='error title-input-error'></span>
        <input id='email-input' type="url" className="popup__input popup__input_info_link" value="" name="link"
                        placeholder="Ссылка на картинку" required/>
        <span className='error email-input-error'></span>
        <button className="popup__button popup__button_invalid popup__button_save" type="submit">
                        Создать
        </button>
      </PopupWithForm>
      ) :
      (
        ''
      ) }

      { isEditAvatarPopupOpen ? (
        <PopupWithForm name='-avatar' title='Обновить аватар' isOpen='popup_opened' onClose={closeAllPopups}>
        <input id='link-input' type="url" className="popup__input popup__input_avatar_link" value="" name="link"
                    placeholder="Ссылка на картинку" required/>
        <span className='error link-input-error'></span>
        <button className="popup__button popup__button_invalid popup__button_save popup__button-avatar" type="submit">
                    Сохранить
        </button>
      </PopupWithForm>
      ) : (
        ''
      ) }

      
      <PopupWithForm name='-delete' title='Вы уверены?'>
        <button className="popup__button  popup__button_save popup__button-delete" type="submit">
                    Да
        </button>
      </PopupWithForm>

      {isImagePopupOpen? (
         <ImagePopup card={selectedCard} isOpen='popup_opened' onClose={closeAllPopups} />
      ) :
      (
        ""
      )}
    </div>
    
  );
}

export default App;


