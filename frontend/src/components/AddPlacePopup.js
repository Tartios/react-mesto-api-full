import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState();

  const [link, setLink] = React.useState();
  
  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ name, link });
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="add"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Создать"
      onSubmit={handleSubmit}
    >
      {" "}
      <input
        name="name"
        type="text"
        id="mark-input"
        value={name || ""}
        onChange={handleChangeName}
        className="popup__input popup__input_mark"
        placeholder="Название"
        minLength="1"
        maxLength="30"
        required
      />
      <span id="mark-input-error" className="popup__input-error"></span>
      <input
        name="link"
        type="url"
        id="link-input"
        value={link || ""}
        onChange={handleChangeLink}
        className="popup__input popup__input_link"
        placeholder="Ссылка на картинку"
        required
      />
      <span id="link-input-error" className="popup__input-error"></span>
    </PopupWithForm>
  );
}
