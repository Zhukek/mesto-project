import { addPopup } from "./modal.js";
import { closePopup, openPopup } from "./util.js";
import { likeIt, addCradRequest, deleteCard } from "./api.js";

const cardTemplate = document.querySelector('#card-template').content;
const popupPicture = document.querySelector('.popup__picture')
const popupCaption = document.querySelector('.popup__caption')
const placeName = document.querySelector('#PlaceName');
const placeLink = document.querySelector('#PlaceLink');
const picPopup = document.querySelector('#picPopup');
export const cardsList = document.querySelector('.cards__list');

export function createCard (item, user) {
  const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
  const likeButton = cardItem.querySelector('.card__button');
  const likeCounter = cardItem.querySelector('.card__like-counter');
  const deleteButton = cardItem.querySelector('.card__delete-button');
  isLiked(cardItem, item, user);

  cardItem.setAttribute('data-cardID', item._id);
  cardItem.querySelector('.card__pic').src = item.link;
  cardItem.querySelector('.card__pic').alt = item.name;
  cardItem.querySelector('.card__pic').addEventListener('click', function() {
    openPopup(picPopup);
    popupPicture.src = item.link;
    popupCaption.textContent = item.name;
    popupPicture.alt = popupCaption.textContent;
  });   /* При нажатии на фото открывает попап с этим фото */
  cardItem.querySelector('.card__text').textContent = item.name;
  likeButton.addEventListener('click', function(evt) {
    clickOnLike(evt, item, likeCounter);
  });   /* Кнопка лайка */
  likeCounter.textContent = item.likes.length;
  if (item.owner._id === user._id) {
    deleteButton.addEventListener('click', function(evt) {
      deleteCard(item._id)
      .then(() => {
        evt.target.closest('.card').remove();
      })
      .catch((err) => {
        console.log(err);
      })
    });   /* Кнопка удаляет карточку*/
  } else {
    deleteButton.remove();
  }

  return cardItem;
}   /* Функция собирает карточку места */

function clickOnLike(evt, item, likeCounter) {
const card = evt.target.closest('.card');
  if (card.dataset.isLiked === 'true') {
    likeIt(item._id, 'DELETE', likeCounter)
      .then(() => {
        card.dataset.isLiked = 'false';
        evt.target.classList.remove('card__like_active');
      })
      .catch((err) => {
        console.log(err);
      })
  } else {
    likeIt(item._id, 'PUT', likeCounter)
      .then(() => {
        card.dataset.isLiked = 'true';
        evt.target.classList.add('card__like_active');
      })
      .catch((err) => {
        console.log(err);
      })
  }
} /* Логика работы кнопки лайка */

function isLiked(cardItem, item, user) {
  if (item.likes.some(like => like._id === user._id)) {
    cardItem.querySelector('.card__like').classList.add('card__like_active');
    cardItem.dataset.isLiked = 'true';
  } else {
    cardItem.dataset.isLiked = 'false';
  }
} /* Проверяем поставлен ли лайк */

export function addCard(evt) {
evt.preventDefault();
const saveButton = addPopup.querySelector('.popup__save-button');
saveButton.value = 'Сохранение...';
addCradRequest({name: placeName.value, link: placeLink.value})
  .then((data) => {
    cardsList.prepend(createCard(data, data.owner));
  })
  .then(() => {
    saveButton.classList.add('popup__save-button_disabled');
    saveButton.setAttribute("disabled", "disabled");
    closePopup();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    saveButton.value = 'Создать';
  })
}
/* Функция добавляет карту места в массив и на страницу */
