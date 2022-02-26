const cardTemplate = document.querySelector('#card-template').content;
const popupPicture = document.querySelector('.popup__picture')
const popupCaption = document.querySelector('.popup__caption')
const cardsList = document.querySelector('.cards__list');
const placeName = document.querySelector('#PlaceName');
const placeLink = document.querySelector('#PlaceLink');
const picPopup = document.querySelector('#picPopup');

import { initialCards } from "./util.js";
import { addPopup } from "./modal.js";
import { closePopup, openPopup } from "./util.js";

function createCard (item) {
  const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
  cardItem.querySelector('.card__pic').src = item.link;
  cardItem.querySelector('.card__pic').addEventListener('click', function(evt) {
    openPopup(picPopup);
    popupPicture.src = evt.target.src;
    popupCaption.textContent = evt.target.nextElementSibling.firstElementChild.textContent;
    popupPicture.alt = popupCaption.textContent;
  });   /* При нажатии на фото открывает попап с этим фото */
  cardItem.querySelector('.card__text').textContent = item.name;
  cardItem.querySelector('.card__button').addEventListener('click', function(evt) {
    evt.target.classList.toggle('card__like_active');
  });   /* Кнопка лайка */
  cardItem.querySelector('.card__delete-button').addEventListener('click', function(evt) {
    evt.target.closest('.card').remove();
  });   /* Кнопка удаляет карточку*/
  return cardItem;
}   /* Функция собирает карточку места */

initialCards.forEach(function (_, num){
cardsList.prepend(createCard(initialCards[num]));
});
/* Добавляет базовые 6 карточек на странциу */

export function addCard (evt) {
evt.preventDefault();
initialCards.push({
  name: placeName.value,
  link: placeLink.value
});
closePopup();
cardsList.prepend(createCard(initialCards[initialCards.length - 1]));
placeName.value = '';
placeLink.value = '';
const saveButton = addPopup.querySelector('.popup__save-button')
saveButton.classList.add('popup__save-button_disabled')
}
/* Функция добавляет карту места в массив и на страницу */
