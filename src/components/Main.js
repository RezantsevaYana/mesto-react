import React from 'react';
import avatarUser from '../images/jak_kusto.jpg'
import pencilLogo from '../images/pancil.svg'
import plusLogo from '../images/plus.svg'
import Card from './Card.js';
import {api} from '../utils/api.js'




function Main(props) {

  // переменные состояния для сохранения информации о пользователе
  const [userName, setUserName] = React.useState()
  const [userDescription, setUserDescription] = React.useState()
  const [userAvatar, setUserAvatar] = React.useState()

  // переменные состояния для карточек

  const [cards, setCards] = React.useState([])

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
          like: item.likes.length
        }))
      );
    })
    .catch(err => {
      console.log(err)
    })
  }, [])


    return (
        <main className="content">

        <section className="profile">
            <button className="profile__avatar-button" onClick={props.onEditAvatar}>
              <img src={userAvatar} className="profile__avatar" alt="Аватар пользователя"/>
            </button>
                  
          <div className="profile__info">
            <h1 className="profile__title">{userName}</h1>
              <button className="profile__button" type='button' onClick={props.onEditProfile}>
                <img src={pencilLogo} className="profile__image" alt="Карандаш"/>
              </button>          
            <p className="profile__subtitle">{userDescription}</p>
          </div>
          <button className="profile__addbutton" type='button' onClick={props.onAddPlace}>
                <img src={plusLogo} className="profile__image" alt="Плюс"/>
          </button>  
        </section>
        <section className="elements">
            {cards.map((item) => {
              return ( <Card key={item.id}
                             card={item}
                             onCardClick={props.onCardClick}>
                      </Card>)
            })}
        </section>
      </main>
    );
  }


  export default Main