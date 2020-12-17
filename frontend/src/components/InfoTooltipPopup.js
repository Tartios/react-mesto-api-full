import React from "react";

export default function InfoTooltipPopup({ isOpen, onClose, req }) {
  
  return (
    <div className={`popup popup_type_info ${isOpen && "popup_open"} `}>
      <div className="popup__container">
        <button
          type="button"
          onClick={onClose}
          className="popup__close-button"
        ></button>
        {req ? (
          <div>
            <div className="popup__req-true"></div>
            <h3 className="popup__info-result">
              Вы успешно зарегистрировались!
            </h3>
          </div>
        ) : (
          <div>
            <div className="popup__req-false"></div>
            <h3 className="popup__info-result">
              Что-то пошло не так! Попробуйте еще раз.
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}
