import { gridCards, popups } from './parameters.js';

// возвращает значение открытой модалки
export const isPopupOpened = (popup) => popup.classList.contains('popup_open');
// проверяет, открыта ли какая-нибудь модалка
export const thisModalIsOpen = () => {
  const popupElement = popups.find((popup) => isPopupOpened(popup));
  return popupElement;
};

export const cardCreator = (element) => {
  // добавляет карточку на страницу
  gridCards.prepend(element);
};

export const apiError = () => Promise.reject(new Error(`Error ${res.status}`));
