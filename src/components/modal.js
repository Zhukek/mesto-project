const profileName = document.querySelector('#name');
const profileAbout = document.querySelector('#about');
const avatarLink = document.querySelector('#avatarLink');
const editButton = document.querySelector('.profile__button_type_edit');
const addButton = document.querySelector('.profile__button_type_add');
const profilePopup = document.querySelector('#profilePopup');
const avatarPopup = document.querySelector('#avatarPopup');
const avatarButton = document.querySelector('.profile__avatar-change');
export const addPopup = document.querySelector('#addCardPopup');
export const pageName = document.querySelector('.profile__name');
export const pageDescription = document.querySelector('.profile__description');
export const profileAvatar = document.querySelector('.profile__avatar');

import { closePopup, openPopup } from "./util.js";
import { updateUserInfo } from "./api.js";
import { updateAvatar } from "./api.js";

export function updatePopup() {
  profileName.value =  pageName.textContent;
  profileAbout.value =  pageDescription.textContent;
};   /* Обновляет значения input в popup профиля */

export function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup();
  }
};  /* функция для закрытия popup на esc */

export function closePopupOverlay(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup();
  }
}; /* функция для закрытия popup на click по overlay */

function resetPopupIfWrong(popup) {
  const form = popup.querySelector('.popup__form');
  const submitButton = form.querySelector('.popup__save-button');
  if (submitButton.classList.contains('popup__save-button_disabled')) {
    form.reset();
  }
}

editButton.addEventListener('click', function() {
  openPopup(profilePopup);
  updatePopup();
});
addButton.addEventListener('click', function() {
  resetPopupIfWrong(addPopup);
  openPopup(addPopup);
});
avatarButton.addEventListener('click', function() {
  resetPopupIfWrong(avatarPopup);
  openPopup(avatarPopup);
});
/* привязал функцию к кнопкам для открытия popup */

export function editProfile(evt) {
  evt.preventDefault();
  const saveButton = profilePopup.querySelector('.popup__save-button');
  saveButton.value = 'Сохранение...';
  updateUserInfo({name: profileName.value, about: profileAbout.value}, pageName, pageDescription)
    .then(() => {
      closePopup();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      saveButton.value = 'Сохранить';
    })
};   /* Функция сохраняет изменения в профиле и закрывает popup*/

export function editAvatar(evt) {
  evt.preventDefault();
  const saveButton = avatarPopup.querySelector('.popup__save-button');
  saveButton.value = 'Сохранение...';
  updateAvatar({avatar: avatarLink.value}, profileAvatar)
    .then(() => {
      closePopup();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      saveButton.value = 'Сохранить';
    })
}
