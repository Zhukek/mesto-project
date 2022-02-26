const profileName = document.querySelector('#name');
const profileAbout = document.querySelector('#about');
const pageName = document.querySelector('.profile__name');
const pageDescription = document.querySelector('.profile__description');
const editButton = document.querySelector('.profile__button_type_edit');
const addButton = document.querySelector('.profile__button_type_add');
const profilePopup = document.querySelector('#profilePopup');
export const addPopup = document.querySelector('#addCardPopup');

import { closePopup, openPopup } from "./util.js";

function updatePopup() {
  profileName.value =  pageName.textContent;
  profileAbout.value =  pageDescription.textContent;
};   /* Обновляет значения input в popup профиля */

updatePopup();

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
/* привязал функцию к кнопкам для открытия popup */

export function editProfile(evt) {
  evt.preventDefault();
  pageName.textContent = profileName.value;
  pageDescription.textContent = profileAbout.value;
  closePopup();
};   /* Функция сохраняет изменения в профиле и закрывает popup*/
