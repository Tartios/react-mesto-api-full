export const parameters = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_block',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__input-error_active',
};

export const openButton = document.querySelector('.profile__info-button');
export const addButton = document.querySelector('.profile__add-button');

export const gridCards = '.foto-grid';

export const popups = Array.from(document.querySelectorAll('.popup'));
export const popupError = Array.from(
  document.querySelectorAll('.popup__input-error'),
);
export const popupProfile = document.querySelector('.popup_type_profile');
export const popupAdd = document.querySelector('.popup_type_add');
export const popupImage = document.querySelector('.popup_type_image');
export const imgSrc = popupImage.querySelector('.popup__imgSrc');
export const imagePopupTitle = popupImage.querySelector('.popup__title');
export const profileAvatar = document.querySelector('.profile__avatar');
export const popupAvatar = document.querySelector('.popup_type_avatar');
export const avatarForm = popupAvatar.querySelector('.popup__form');
export const profileForm = popupProfile.querySelector('.popup__form');
export const addForm = popupAdd.querySelector('.popup__form');

export const inputName = profileForm.querySelector('.popup__input_name');
export const inputProf = profileForm.querySelector('.popup__input_prof');
export const inputMark = addForm.querySelector('.popup__input_mark');
export const inputLink = addForm.querySelector('.popup__input_link');

export const formSave = profileForm.querySelector('.popup__save-button');
export const addSave = addForm.querySelector('.popup__save-button');

export const profileName = document.querySelector('.profile__name');
export const profileProf = document.querySelector('.profile__prof');

export const myID = 'b7f21f02-0f3c-4a3e-ae62-e9761e3102fc';
export const userID = 'ccc3841f08657ff5c04cac75';
