const popupProfileForm = document.querySelector('#profile-form');
const popupAddForm = document.querySelector('#addForm');
const popupAvatarForm = document.querySelector('#avatarForm');
const closeButtons = document.querySelectorAll('.popup__close-button');
const forms = Array.from(document.querySelectorAll('.popup__form'));

import { addCard, createCard, cardsList } from "./components/card.js";
import { closePopup } from "./components/util.js";
import { setValidation } from "./components/validate.js";
import { editProfile, editAvatar, pageName, pageDescription, profileAvatar, updatePopup } from "./components/modal.js";
import { getInfo } from "./components/api.js";
import './pages/index.css';

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
popupAvatarForm.addEventListener('submit', editAvatar);
/* Отправка форм Имя/професия или аватар */

popupAddForm.addEventListener('submit', addCard);
/* Добавляет карточку из формы */

const userPromise = getInfo('/users/me');
const cardsPromise = getInfo('/cards');
const getPromises = [userPromise, cardsPromise];
Promise.all(getPromises)
  .then((data) => {
    const aboutUser = data[0];
    const allCards = data[1];

    pageName.textContent = aboutUser.name;
    pageDescription.textContent = aboutUser.about;
    profileAvatar.src = aboutUser.avatar;
    /* Получить начальные данные пользователя */

    allCards.forEach(function(item) {
      cardsList.append(createCard(item, aboutUser));
    })
    /* добавляет карточки с сервера на страницу */
  })
  .catch((err) => {
    console.log(err);
  });
