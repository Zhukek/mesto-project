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

editButton.addEventListener('click', function() {
  openPopup(profilePopup);
  updatePopup();
});
addButton.addEventListener('click', function() {
  openPopup(addPopup);
});
avatarButton.addEventListener('click', function() {
  openPopup(avatarPopup);
});
/* привязал функцию к кнопкам для открытия popup */

export function editProfile(evt) {
  evt.preventDefault();
  const saveButton = profilePopup.querySelector('.popup__save-button');
  saveButton.value = 'Сохранение...';
  updateUserInfo({name: profileName.value, about: profileAbout.value}, pageName, pageDescription)
    .finally(() => {
      saveButton.value = 'Сохранить';
      closePopup();
    })
};   /* Функция сохраняет изменения в профиле и закрывает popup*/

export function editAvatar(evt) {
  evt.preventDefault();
  const saveButton = avatarPopup.querySelector('.popup__save-button');
  saveButton.value = 'Сохранение...';
  updateAvatar({avatar: avatarLink.value}, profileAvatar)
  .finally(() => {
    saveButton.value = 'Сохранить';
    closePopup();
  })
}
