const popupProfileForm = document.querySelector('#profile-form');
const profileName = document.querySelector('#name');
const profileAbout = document.querySelector('#about');
const profilePopup = document.querySelector('#profilePopup')

const popupAddForm = document.querySelector('#addForm');
const placeName = document.querySelector('#PlaceName');
const placeLink = document.querySelector('#PlaceLink');
const addPopup = document.querySelector('#addCardPopup');

const popupPicture = document.querySelector('.popup__picture')
const popupCaption = document.querySelector('.popup__caption')
const picPopup = document.querySelector('#picPopup');
const cardsList = document.querySelector('.cards__list');
let initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
  ];

function popupUpdate() {
  profileName.value =  document.querySelector('.profile__name').textContent;
  profileAbout.value =  document.querySelector('.profile__description').textContent;
};   /* Обновляет значения input в popup профиля */

popupUpdate();

function popupOpen(popup) {
  popup.classList.add('popup_opened');
};   /* функция открывает popup */

function popupClose(evt) {
    evt.target.closest('.popup').classList.remove('popup_opened');
};   /* Функция закрывает родительский попап */

const closeButtons = document.querySelectorAll('.popup__close-button');
closeButtons.forEach(function(button) {
  button.addEventListener('click', popupClose);
});   /* Подключение функции popupClose ко всем кнопкам  popup__close-button*/

document.querySelector('.profile__button_type_edit').addEventListener('click', function() {
  popupOpen(profilePopup);
  popupUpdate();
});
document.querySelector('.profile__button_type_add').addEventListener('click', function() {
  popupOpen(addPopup);
});
/* привязал функцию к кнопкам для открытия popup */

function editProfile(evt) {
  evt.preventDefault();
  document.querySelector('.profile__name').textContent = profileName.value;
  document.querySelector('.profile__description').textContent = profileAbout.value;
  popupClose(evt);
};   /* Функция сохраняет изменения в профиле и закрывает popup*/

popupProfileForm.addEventListener('submit', editProfile);
/* Отправка формы Имя/професия */

function addinitialCards (item) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
    cardItem.querySelector('.card__pic').src = initialCards[item].link;
    cardItem.querySelector('.card__pic').addEventListener('click', function() {
      popupOpen(picPopup);
      popupPicture.src = event.target.src;
      popupCaption.textContent = event.target.nextElementSibling.firstElementChild.textContent
    });   /* При нажатии на фото открывает попап с этим фото */
    cardItem.querySelector('.card__text').textContent = initialCards[item].name;
    cardItem.querySelector('.card__button').addEventListener('click', function() {
      event.target.classList.toggle('card__like_active');
    });   /* Кнопка лайка */
    cardItem.querySelector('.card__delete-button').addEventListener('click', function() {
          initialCards = initialCards.filter(function(item) {
            if (item.name !== event.target.previousElementSibling.firstElementChild.textContent) {
              return item;
            };
          });
      event.target.closest('.card').remove();
    });   /* Кнопка удаляет карточку и соответствующий элемент из массива */
  cardsList.prepend(cardItem);
}   /* Функция собирает карточку места */
initialCards.forEach(function (_, num){
  addinitialCards(num);
});
/* Добавляет базовые 6 карточек на странциу */

function addCard (evt) {
  evt.preventDefault();
  initialCards.push({
    name: placeName.value,
    link: placeLink.value
  });
  popupClose(evt);
  addinitialCards(initialCards.length - 1);
  placeName.value = '';
  placeLink.value = '';
}
/* Функция добавляет карту места в массив и на страницу */
popupAddForm.addEventListener('submit', addCard)

