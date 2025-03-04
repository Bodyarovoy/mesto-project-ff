import '../pages/index.css';
import { initialCards, createCard, deleteCardCallback, toggleLikeCallback } from './components/card.js';
import { openPopup, closePopup, closeByClick } from './components/modal.js';
import { enableValidation, clearValidation, hideInputError, toggleButtonState, validationConfig } from './components/validation.js';

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// DOM узлы
const placesList = document.querySelector('.places__list');

// Вывести карточки на страницу

// initialCards.forEach((cardInfo) => {
//     const card = createCard(cardInfo, deleteCardCallback, toggleLikeCallback, openImagePopupCallback);
//     placesList.append(card);
// });

// Добавление новой карточки
const formElementNewCard = document.querySelector('.popup_type_new-card');
const cardInput = document.querySelector('.popup__input_type_card-name');
const urlInput = document.querySelector('.popup__input_type_url');

// Открытие попапов
const popupNewPlase = document.querySelector('.popup_type_new-card');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupImage = document.querySelector('.popup_type_image');

const buttonNewPlase = document.querySelector('.profile__add-button');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonImage = document.querySelector('.card__image');

//Изменение данных профиля
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

// Добавоение карточки с картинкой
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

// Попап с картинкой
const imageLink = document.querySelector('.popup__image');
const imageAlt = document.querySelector('.popup__caption');

// Слушатели закрытия попапов по нажатию на оверлей
popupEditProfile.addEventListener('click', closeByClick);
popupNewPlase.addEventListener('click', closeByClick);
popupImage.addEventListener('click', closeByClick);

// Слушатель добавления новой карточки
formElementNewCard.addEventListener('submit', handleFormElementNewCardSubmit);

//Сохранение данных формы 
const formElementEdit = document.querySelector('.popup_type_edit');

// Слушатель сохранения данных профиля
formElementEdit.addEventListener('submit', handleFormElementEditSubmit); 

// Анимация попапов
const popup = document.querySelectorAll('.popup');
popup.forEach((popup) => {
    popup.classList.add('popup_is-animated');
});

// Слушатели открытия попапов
buttonNewPlase.addEventListener('click', () => {
  cardInput.value = '';
  urlInput.value = '';
  hideInputError(formElementNewCard, cardInput);
  hideInputError(formElementNewCard, urlInput);
  openPopup(popupNewPlase);
});

buttonEditProfile.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(popupEditProfile, validationConfig); 
  openPopup(popupEditProfile);
  
});

// buttonImage.addEventListener('click', () => {
//   openPopup(popupImage);
// });

// Обработчик сохранения данных профиля
function handleFormElementEditSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(formElementEdit);
}

// Обработчик добавления новой карточки
function handleFormElementNewCardSubmit(evt) {
    evt.preventDefault();

    cardInput.value;
    urlInput.value;

    const newCard = createCard({ name: cardInput.value, link: urlInput.value }, deleteCardCallback, toggleLikeCallback, openImagePopupCallback);
    placesList.prepend(newCard);
    
    closePopup(formElementNewCard);
    cardInput.value = '';
    urlInput.value = '';
    toggleButtonState([cardInput, urlInput], formElementNewCard.querySelector('.popup__button'));
}

// Функция отрытия попапа с картинкой
function openImagePopupCallback (buttonImage) {
  openPopup(popupImage);

  imageLink.src = buttonImage.src;
  imageAlt.textContent = buttonImage.alt;
  imageLink.setAttribute("alt", buttonImage.alt);
}
 
// Вызов функции включения валидации
enableValidation(validationConfig);

// Вызов функции очистки ошибок валидации 
clearValidation(popupEditProfile, validationConfig); 


// Токен: 8fd71c29-8230-43ff-93ba-61027797503a
// Идентификатор группы: wff-cohort-34

// Загрузка данных профиля
fetch('https://nomoreparties.co/v1/wff-cohort-34/users/me', {
  method: 'GET',
  headers: {
    authorization: '8fd71c29-8230-43ff-93ba-61027797503a'
  }
})
  .then(res => res.json())
  .then((result) => {
    profileTitle.textContent = result.name;
    profileDescription.textContent = result.about;
    profileImage.src = result.avatar; 
  });

fetch('https://nomoreparties.co/v1/wff-cohort-34/users/me', {
  method: 'PATCH',
  headers: {
    authorization: '8fd71c29-8230-43ff-93ba-61027797503a',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    // остановился тут, нужно педедавать данные из формы ввода на сервер
    name: profileTitle.textContent,
    about: 'Physicist and '
  })
}); 




// Загрузка карточек
fetch('https://nomoreparties.co/v1/wff-cohort-34/cards', {
  method: 'GET',
  headers: {
    authorization: '8fd71c29-8230-43ff-93ba-61027797503a'
  }
})
  .then(res => res.json())
  .then((result) => {
    result.forEach((cardInfo) => {
    const card = createCard(cardInfo, deleteCardCallback, toggleLikeCallback, openImagePopupCallback);
    placesList.append(card);
  });  
});





export { cardTemplate };