import React from 'react';

function Card(props) {

  function handleClick() {
    props.onCardClick(props.card);
  } 

    return (
        <section className="elements">
              <article className="element">
                <button className="element__delete" type="button"></button>
                <img src={props.card.url} className="element__photo" alt={props.card.alt} onClick={handleClick}/>         
                 <div className="element__container">
                    <h2 className="element__title">{props.card.title}</h2>
                    <div className='element__likes'>
                        <button className="element__button" type="button"></button>
                        <p className='element__counter'>0</p>
                    </div>
                  </div>
              </article>
        </section>
        
    );
  }


  export default Card







