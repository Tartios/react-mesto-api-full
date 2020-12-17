import React from "react";

export default function ImagePopup({card, onClose}) {
  return (
    <div className={`popup popup_type_image ${card.link && "popup_open"}`}>
      <div className="popup__container popup__container_img">
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        ></button>
        <img src={card.link} alt={card.name} className="popup__imgSrc" />
        <h3 className="popup__title popup__title_img-container">{card.name}</h3>
      </div>
    </div>
  );
}
