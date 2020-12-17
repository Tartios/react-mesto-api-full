import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef("");

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }
  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      children=""
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        name="link"
        type="url"
        ref={avatarRef}
        id="link-input"
        className="popup__input popup__input_link"
        placeholder="Ссылка на аватар"
        required
      />
      <span id="link-input-error" className="popup__input-error"></span>
    </PopupWithForm>
  );
}
