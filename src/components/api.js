const config = {
  baseURL: 'https://nomoreparties.co/v1/plus-cohort7',
  headers: {
    authorization: '85b3513c-7007-47da-98aa-43089a80409b',
    'Content-Type': 'application/json'
  }
}
function checkAndGo(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}
function catchError(err) {
  console.log(err);
}

export function getInfo(way) {
  return fetch(config.baseURL+way, {
  headers: config.headers
})
  .then(checkAndGo)
} /* Функция забирает инфо с сервера*/

function updateInfo(inbody, way) {
  return fetch(config.baseURL+`/users/me${way}`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(inbody)
  })
  .then(checkAndGo)
} /* Функция редактирует инфо на сервере */

export function updateUserInfo(inbody, pageName, pageAbout) {
  return updateInfo(inbody, '')
    .then((data) => {
      pageName.textContent = data.name;
      pageAbout.textContent = data.about;
    })
    .catch(catchError);
} /* Редактирует инфо в профиле */

export function updateAvatar(inbody, avatar) {
  return updateInfo(inbody, '/avatar')
    .then((data) => {
      avatar.src = data.avatar;
    })
    .catch(catchError);
} /* Обновляет аватар */

export function likeIt(cardId, whatToDo, likeCounter) {
  return fetch(config.baseURL+`/cards/likes/${cardId}`, {
    method: whatToDo,
    headers: config.headers
  })
  .then(checkAndGo)
  .then((data) => {
    likeCounter.textContent = data.likes.length;
  })
  .catch(catchError);
} /* Отправляет или удаляет лайк, и обновляет занчение в счетчике */

export function addCradRequest(inbody) {
  return fetch(config.baseURL+'/cards', {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(inbody)
  })
  .then(checkAndGo)
  .catch(catchError);
}/* Запрос на добавление карточки */

export function deleteCard(cardID) {
  return fetch(config.baseURL+`/cards/${cardID}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(checkAndGo)
  .catch(catchError)
}/* Запрос на удаление карточки */
