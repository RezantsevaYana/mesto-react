import React from 'react';
import avatarUser from '../images/jak_kusto.jpg'
import pencilLogo from '../images/pancil.svg'
import plusLogo from '../images/plus.svg'
import Card from './Card.js';




function Main(props) {
    return (
        <main className="content">

        <section className="profile">
            <button className="profile__avatar-button" onClick={props.onEditAvatar}>
              <img src={props.userAvatar} className="profile__avatar" alt="Аватар пользователя"/>
            </button>
                  
          <div className="profile__info">
            <h1 className="profile__title">{props.userName}</h1>
              <button className="profile__button" type='button' onClick={props.onEditProfile}>
                <img src={pencilLogo} className="profile__image" alt="Карандаш"/>
              </button>          
            <p className="profile__subtitle">{props.userDescription}</p>
          </div>
          <button className="profile__addbutton" type='button' onClick={props.onAddPlace}>
                <img src={plusLogo} className="profile__image" alt="Плюс"/>
          </button>  
        </section>
        <section className="elements">
            {props.cards.map((item) => {
              return <Card key={item.id} card={item} onCardClick={props.onCardClick}></Card>
            })}
        </section>
      </main>
    
    );
  }


  export default Main