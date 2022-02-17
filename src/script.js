const popupProfileForm = document.querySelector('#profile-form');
const profileName = document.querySelector('#name');
const profileAbout = document.querySelector('#about');
const profilePopup = document.querySelector('#profilePopup')
const pageName = document.querySelector('.profile__name');
const pageDescription = document.querySelector('.profile__description');

const popupAddForm = document.querySelector('#addForm');
const placeName = document.querySelector('#PlaceName');
const placeLink = document.querySelector('#PlaceLink');
const addPopup = document.querySelector('#addCardPopup');
const editButton = document.querySelector('.profile__button_type_edit');
const addButton = document.querySelector('.profile__button_type_add');

const cardTemplate = document.querySelector('#card-template').content;
const popupPicture = document.querySelector('.popup__picture')
const popupCaption = document.querySelector('.popup__caption')
const picPopup = document.querySelector('#picPopup');
const cardsList = document.querySelector('.cards__list');
const initialCards = [
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

function updatePopup() {
  profileName.value =  pageName.textContent;
  profileAbout.value =  pageDescription.textContent;
};   /* Обновляет значения input в popup профиля */

updatePopup();

function openPopup(popup) {
  popup.classList.add('popup_opened');
  function closePopupEsc(evt) {
    if (evt.key === 'Escape') {
      popup.classList.remove('popup_opened');
      document.removeEventListener('keydown', closePopupEsc);
    }
  };  /* функция для закрытия popup на esc */
  document.addEventListener('keydown', closePopupEsc)
};   /* функция открывает popup */

function closePopup(evt) {
    evt.target.closest('.popup').classList.remove('popup_opened');
};   /* Функция закрывает родительский попап */

const closeButtons = document.querySelectorAll('.popup__close-button');
closeButtons.forEach(function(button) {
  button.addEventListener('click', closePopup);
});   /* Подключение функции closePopup ко всем кнопкам  popup__close-button*/

editButton.addEventListener('click', function() {
  openPopup(profilePopup);
  updatePopup();
});
addButton.addEventListener('click', function() {
  openPopup(addPopup);
});
/* привязал функцию к кнопкам для открытия popup */

function editProfile(evt) {
  evt.preventDefault();
  pageName.textContent = profileName.value;
  pageDescription.textContent = profileAbout.value;
  closePopup(evt);
};   /* Функция сохраняет изменения в профиле и закрывает popup*/

popupProfileForm.addEventListener('submit', editProfile);
/* Отправка формы Имя/професия */

function createCard (item) {
    const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
    cardItem.querySelector('.card__pic').src = item.link;
    cardItem.querySelector('.card__pic').addEventListener('click', function() {
      openPopup(picPopup);
      popupPicture.src = event.target.src;
      popupCaption.textContent = event.target.nextElementSibling.firstElementChild.textContent;
      popupPicture.alt = popupCaption.textContent;
    });   /* При нажатии на фото открывает попап с этим фото */
    cardItem.querySelector('.card__text').textContent = item.name;
    cardItem.querySelector('.card__button').addEventListener('click', function() {
      event.target.classList.toggle('card__like_active');
    });   /* Кнопка лайка */
    cardItem.querySelector('.card__delete-button').addEventListener('click', function() {
      event.target.closest('.card').remove();
    });   /* Кнопка удаляет карточку*/
    return cardItem;
}   /* Функция собирает карточку места */

initialCards.forEach(function (_, num){
  cardsList.prepend(createCard(initialCards[num]));
});
/* Добавляет базовые 6 карточек на странциу */

function addCard (evt) {
  evt.preventDefault();
  initialCards.push({
    name: placeName.value,
    link: placeLink.value
  });
  closePopup(evt);
  cardsList.prepend(createCard(initialCards[initialCards.length - 1]));
  placeName.value = '';
  placeLink.value = '';
}
/* Функция добавляет карту места в массив и на страницу */
popupAddForm.addEventListener('submit', addCard)

