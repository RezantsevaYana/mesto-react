import React from 'react';
//import logo from './logo.svg';
//import '../index.css';
import Header from './Header.js';
import Main from './Main.js'
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js'


function App() {

  // переменные состояния для открытия попапов

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  
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
    setSelectedCard('')
  
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }


  return (
    <div className="page">
      <Header />
      <Main onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick = {handleCardClick}
      />
      <Footer />
      
        <PopupWithForm name='_js_editor' title='Редактировать профиль' isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} buttonText='Сохранить'>
        <input id="name-input" type="text" className="popup__input popup__input_info_name"  name="name"
                        placeholder="Ваше имя"/>
        <span className='error name-input-error'></span>
        <input id="description-input" type="text" className="popup__input popup__input_info_job"
                        name="about" placeholder="Ваш род деятельности"/>
        <span className='error description-input-error'></span>
        </PopupWithForm>
     

        <PopupWithForm name='_js_item' title='Новое место' isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} buttonText='Создать'>
        <input id="title-input" type="text" className="popup__input popup__input_info_title"
                        name="name" placeholder="Название"/>
        <span className='error title-input-error'></span>
        <input id='email-input' type="url" className="popup__input popup__input_info_link" name="link"
                        placeholder="Ссылка на картинку"/>
        <span className='error email-input-error'></span>
        </PopupWithForm>
     

        <PopupWithForm name='-avatar' title='Обновить аватар' isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} buttonText='Сохранить'>
        <input id='link-input' type="url" className="popup__input popup__input_avatar_link" name="link"
                    placeholder="Ссылка на картинку"/>
        <span className='error link-input-error'></span>
      </PopupWithForm>
    
      <PopupWithForm name='-delete' title='Вы уверены?' buttonText='Да' />
        
      <ImagePopup card={selectedCard} isOpen={selectedCard.url} onClose={closeAllPopups} />

    </div>
    
  );
}

export default App;


