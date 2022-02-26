const popupProfileForm = document.querySelector('#profile-form');
const popupAddForm = document.querySelector('#addForm');
const closeButtons = document.querySelectorAll('.popup__close-button');

import { editProfile } from "./components/modal.js";
import { addCard } from "./components/card.js";
import { closePopup } from "./components/util.js";

export const validationConfig = {
  submitButton: 'popup__save-button',
  submitButtonInactive: 'popup__save-button_disabled',
  inputElement: 'popup__input',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__input-error_active'
}

closeButtons.forEach(function(button) {
  button.addEventListener('click', closePopup);
});   /* Подключение функции closePopup ко всем кнопкам  popup__close-button*/

popupProfileForm.addEventListener('submit', editProfile);
/* Отправка формы Имя/професия */

popupAddForm.addEventListener('submit', addCard)
/* Добавляет карточку из формы */
