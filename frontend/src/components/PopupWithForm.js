import React from "react";

export default function PopupWithForm({
  title,
  name,
  children,
  isOpen,
  onClose,
  buttonText,
  onSubmit,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && "popup_open"} `}>
      <div className="popup__container">
        <button
          type="button"
          onClick={onClose}
          className="popup__close-button"
        ></button>
        <h3 className="popup__title">{title}</h3>{" "}
        <form action="#" className="popup__form" onSubmit={onSubmit} noValidate>
          {children}
          <button type="submit" className="popup__save-button">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
