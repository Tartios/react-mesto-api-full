import React from "react";
import Card from "./Card.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import ArrCards from "../contexts/CardsContext.js";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onLikeClick,
  onDeleteCard,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  const cards = React.useContext(ArrCards);

  return (
    <main>
      <section className="profile">
        <button
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
          className="profile__avatar"
          onClick={onEditAvatar}
        ></button>
        <div className="profile__info">
          <div className="profile__info-input">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__prof">{currentUser.about}</p>
          </div>
          <button
            type="button"
            className="profile__info-button"
            onClick={onEditProfile}
          ></button>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="foto-grid">
        {cards.map((item) => (
          <Card
            key={item._id}
            onCardClick={onCardClick}
            onLikeClick={onLikeClick}
            onDeleteCard={onDeleteCard}
            card={item}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
