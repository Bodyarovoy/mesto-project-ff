const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-34',
  headers: {
    authorization: '8fd71c29-8230-43ff-93ba-61027797503a',
    'Content-Type': 'application/json'
  }
}

const handlerResponse = (res) => {
  return res.ok 
    ? res.json() 
    : res.json().then((err) => Promise.reject({ status: res.status, ...err }));
};

// Функция получения данных профиля с сервера
const getProfileInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers,
  })
  .then(handlerResponse)
};

// Функция обновления инфомарции профиля на сервере
const updateProfileInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    }),
  })
  .then(handlerResponse)
};

// Фукция добавление новой карточки на сервер
const addNewCardToServer = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    })
  })
  .then(handlerResponse)
  
}

// Функция загрузки карточек c сервера
const receiveCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
      headers: config.headers,
  })
  .then(handlerResponse)
}

// Функция удаления карточки с сервера
const deleteCardFromServer = (cardId) => { 
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
 })
 .then(handlerResponse)
}

// Функция обновления аватара
const updateAvatar = (avatarUrl) => { 
   return fetch(`${config.baseUrl}/users/me/avatar`, {
  method: 'PATCH',
  headers: config.headers,
      body: JSON.stringify({
      avatar: avatarUrl
    })   
  })
  .then(handlerResponse);
}
// Функция добаления лайка на сервере
const addLikeToCardOnServer = (cardId) => { 
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
      headers: config.headers,
  })
  .then(handlerResponse);
}

// Функция снятия лайка на сервере
const removeLikeFromCardOnServer = (cardId) => { 
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
      headers: config.headers,
  })
  .then(handlerResponse);
}



export { getProfileInfo, updateProfileInfo, addNewCardToServer, receiveCards, deleteCardFromServer, updateAvatar, addLikeToCardOnServer, removeLikeFromCardOnServer}