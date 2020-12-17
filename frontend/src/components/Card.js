import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

export default function Card({ card, onCardClick, onLikeClick, onDeleteCard }) {
  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onLikeClick(card);
  }

  function handleDeleteCard() {
    onDeleteCard(card);
  }

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;

  const isLiked = card.likes.some((i) => i === currentUser._id);

  const cardLikeButtonClassName = `${
    isLiked ? "foto-grid__like-button_true" : ""
  }`;

  return (
    <div className="foto-grid__section">
      <button className="foto-grid__img-button">
        <img
          src={card.link}
          alt={card.name}
          className="foto-grid__image"
          onClick={handleClick}
        />
      </button>
      {isOwn && <button
   className='foto-grid__delete-button'
   onClick={handleDeleteCard}
/>}
      <div className="foto-grid__card">
        <h2 className="foto-grid__title">{card.name}</h2>
        <div>
          <button
            type="submit"
            className={`foto-grid__like-button ${cardLikeButtonClassName}`}
            onClick={handleLikeClick}
          ></button>
          <p className="foto-grid__like-counter"></p>
        </div>
      </div>
    </div>
  );
}
