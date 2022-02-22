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
const closeButtons = document.querySelectorAll('.popup__close-button');
const forms = Array.from(document.querySelectorAll('.popup__form'))

function updatePopup() {
  profileName.value =  pageName.textContent;
  profileAbout.value =  pageDescription.textContent;
};   /* Обновляет значения input в popup профиля */

updatePopup();

function closePopup() {
  const popupOpened = document.querySelector('.popup_opened');
  popupOpened.classList.remove('popup_opened');
  document.removeEventListener('click', closePopupOverlay);
  document.removeEventListener('keydown', closePopupEsc);
};   /* Функция закрывает открытый попап */

function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup();
  }
};  /* функция для закрытия popup на esc */

function closePopupOverlay(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup();
  }
}; /* функция для закрытия popup на click по overlay */

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
  document.addEventListener('click', closePopupOverlay);
};   /* функция открывает popup */

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


const validationConfig = {
  submitButton: 'popup__save-button',
  submitButtonInactive: 'popup__save-button_disabled',
  inputElement: 'popup__input',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__input-error_active'
} /* Надо передавать в нее объект */

forms.forEach(function(form) {
  setValidation (form, validationConfig)
}) /* Добавляет валидацию на все формы */

function setValidation (form, config) {
  const inputList = Array.from(form.querySelectorAll(`.${config.inputElement}`));

  toggleButton(form, inputList, config);
  inputList.forEach(function(input) {
    input.addEventListener('input', function() {
      checkValidation(form, input, config);
      toggleButton(form, inputList, config);
    });
  }); /* Добавляет валидацию на инпуты */
}

function checkValidation (form, input, config) {
  if (!input.validity.valid) {
    showError(form, input, input.validationMessage, config);
  } else {
    hideError(form, input, config)
  };
} /* Проверяет валидацию инпута */

function showError (form, input, errorMessage, config) {
  const inputID = input.id;
  const errorItem = form.querySelector(`.${inputID}-error`);
  errorItem.classList.add(config.errorClass);
  errorItem.textContent = errorMessage;
  input.classList.add(config.inputErrorClass);
} /* Показать ошибку при заполнении инпута */

function hideError (form, input, config) {
  const inputID = input.id;
  const errorItem = form.querySelector(`.${inputID}-error`);
  errorItem.classList.remove(config.errorClass);
  errorItem.textContent = '';
  input.classList.remove(config.inputErrorClass);
} /* Спрятать ошибку при заполнении инпута */

function hasInvalidInput(inputList) {
  return inputList.some(function(input) {
    return !input.validity.valid;
  });
} /* Проверяет правильность формы */

function toggleButton(form, inputList, config) {
  const saveButton = form.querySelector(`.${config.submitButton}`)

  if (hasInvalidInput(inputList) === true) {
    saveButton.classList.add(config.submitButtonInactive);
  } else {
    saveButton.classList.remove(config.submitButtonInactive);
  };
} /* Активирует/блокирует кнопку сабмита */





function editProfile(evt) {
  evt.preventDefault();
  pageName.textContent = profileName.value;
  pageDescription.textContent = profileAbout.value;
  closePopup();
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
  closePopup();
  cardsList.prepend(createCard(initialCards[initialCards.length - 1]));
  placeName.value = '';
  placeLink.value = '';
  const saveButton = addPopup.querySelector('.popup__save-button')
  saveButton.classList.add('popup__save-button_disabled')
}
/* Функция добавляет карту места в массив и на страницу */
popupAddForm.addEventListener('submit', addCard)

