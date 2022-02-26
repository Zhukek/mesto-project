const popupProfileForm = document.querySelector('#profile-form');
const popupAddForm = document.querySelector('#addForm');
const closeButtons = document.querySelectorAll('.popup__close-button');
const forms = Array.from(document.querySelectorAll('.popup__form'));

import { editProfile } from "./components/modal.js";
import { addCard } from "./components/card.js";
import { closePopup } from "./components/util.js";
import { setValidation } from "./components/validate.js";
import './pages/index.css'

export const validationConfig = {
  submitButton: 'popup__save-button',
  submitButtonInactive: 'popup__save-button_disabled',
  inputElement: 'popup__input',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__input-error_active'
}

forms.forEach(function(form) {
  setValidation (form, validationConfig)
}) /* Добавляет валидацию на все формы */

closeButtons.forEach(function(button) {
  button.addEventListener('click', closePopup);
});   /* Подключение функции closePopup ко всем кнопкам  popup__close-button*/

popupProfileForm.addEventListener('submit', editProfile);
/* Отправка формы Имя/професия */

popupAddForm.addEventListener('submit', addCard)
/* Добавляет карточку из формы */
