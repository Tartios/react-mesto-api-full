import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);
  const [name, setName] = React.useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  const [descriprion, setDescription] = React.useState("");

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({ name, about: descriprion });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        name="name"
        type="text"
        id="name-input"
        value={name || ""}
        onChange={handleChangeName}
        className="popup__input popup__input_name"
        minLength="2"
        maxLength="40"
        required
      />
      <span id="name-input-error" className="popup__input-error"></span>
      <input
        name="about"
        type="text"
        id="self-input"
        value={descriprion || ""}
        onChange={handleChangeDescription}
        className="popup__input popup__input_prof"
        minLength="2"
        maxLength="200"
        required
      />
      <span id="self-input-error" className="popup__input-error"></span>
    </PopupWithForm>
  );
}
