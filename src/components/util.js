import { closePopupEsc, closePopupOverlay } from './modal.js';

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
  popup.addEventListener('click', closePopupOverlay);
};   /* функция открывает popup */

export function closePopup() {
  const popupOpened = document.querySelector('.popup_opened');
  popupOpened.classList.remove('popup_opened');
  popupOpened.removeEventListener('click', closePopupOverlay);
  document.removeEventListener('keydown', closePopupEsc);
  popupOpened.querySelector('.popup__form').reset();
};   /* Функция закрывает открытый попап */
