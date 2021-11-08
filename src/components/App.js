import React from 'react';
import Header from './Header.js';
import Main from './Main.js'
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js'
import { api } from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js'
import DeleteCard from './DeleteCard.js';

function App() {
  // переменные состояния для открытия попапов

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [isDeleteCard, setIsDeleteCard] = React.useState(false)
  
  const [selectedCard, setSelectedCard] = React.useState({})

  // переменная состояния отвечающая за удаление карточки

  const [deleteCard, setDeleteCard] = React.useState({})

  // стейт отвечающий за данные текущего пользователя

  const [currentUser, setCurrentUser] = React.useState({});

  // переменные состояния для карточек

  const [cards, setCards] = React.useState([])

  // переменная состояния для идентификатора загрузки

  const [isLoading, setIsLoading] = React.useState(false)


  // загрузка первоначальной коллекции карточек и информации о пользователе
  React.useEffect(()=> {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([profile, cards]) => {
      setCurrentUser(profile);
      setCards(cards);
    })
    .catch(err => {
        console.log(err)
    })
  }, [])

  // попап добавления карточки

  function handleAddPlaceSubmit(newCard) {
    setIsLoading(true)
    api.addCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => { closeAllPopups();
                      setIsLoading(false) })
  }



  function handleCardLike(card) {
    // проверка есть ли лайк на текущей карточке
    // возвращает тру если среди лайкoв есть лайк пользователя
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

   // console.log(isLiked)

    // если пользователь не поставил лайк, то мы должны его добавить
    if (!isLiked) {
      api
        .likeCard(card._id)
        .then((newCard) => {
          const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
          setCards(newCards);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      api
        .deleteLikeCard(card._id)
        .then((newCard) => {
          const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
          setCards(newCards);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

// обработчик удаления карточки
  function handleCardDelete() {
    setIsLoading(true)
    api.deleteCards(deleteCard._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== deleteCard._id);
        setCards(newCards);
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {closeAllPopups()
                      setIsLoading(false)})
  }

 

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

  function handleDeleteCard(card) {
    setIsDeleteCard(true)
    setDeleteCard(card)

  }

  // функция закрытия попапов

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsDeleteCard(false)
    setSelectedCard({})
    setDeleteCard({})
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  // обработчик изменения информации о пользователе

  function handleUpdateUser(user) {
    setIsLoading(true)
    api.editUserInfo(user)
      .then((user) => setCurrentUser(user))
      .catch(err => {
        console.log(err)
      })
      .finally(() => {closeAllPopups()
                    setIsLoading(false)});
  }

  // обработчик изменения аватара пользователя

  function handleUpdateAvatar(item) {
    setIsLoading(true)
    api.editAvatar(item)
      .then((res) => {
        setCurrentUser(res)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {closeAllPopups();
                    setIsLoading(false)})
  }

 


  return (
    // Подключаем дерево компонентов к провайдеру контекста
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick = {handleCardClick}
              onCardLike = {handleCardLike}
              onCardDelete = {handleDeleteCard}
              cards = {cards}
        />
        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen}
                          onClose={closeAllPopups}
                          onUpdateUser={handleUpdateUser}
                          isLoading={isLoading} >
        </EditProfilePopup>

        <AddPlacePopup isOpen={isAddPlacePopupOpen}
                      onClose={closeAllPopups}
                      addNewCard={handleAddPlaceSubmit}
                      onAddPlace={handleAddPlaceSubmit} 
                      isLoading={isLoading}>
        </AddPlacePopup>
      
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}
                        isLoading={isLoading}>
        </EditAvatarPopup>
      
        <DeleteCard isOpen={isDeleteCard}
                    onClose={closeAllPopups}
                    onDeleteCard={handleCardDelete} 
                    card={deleteCard}
                    isLoading={isLoading}>
        </DeleteCard>
            
        <ImagePopup card={selectedCard} isOpen={selectedCard.link} onClose={closeAllPopups} />

      </div>
    </CurrentUserContext.Provider>
    
  );
}

export default App;




