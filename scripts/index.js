import '../pages/index.css';
import { initialCards,  createCard, deleteCardCallback, toggleLikeCallback } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
export { cardTemplate };

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// DOM узлы
const placesList = document.querySelector('.places__list');

// Вывести карточки на страницу
initialCards.forEach((cardInfo) => {
    const card = createCard(cardInfo, deleteCardCallback, toggleLikeCallback, openImagePopupCallback);
    placesList.append(card);
});

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

// Добавоение карточки с картинкой
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

// Попап с картинкой
const imageLink = document.querySelector('.popup__image');
const imageAlt = document.querySelector('.popup__caption');

// Слушатели закрытия попапов по нажатию на оверлей
popupEditProfile.addEventListener('click', closePopup);
popupNewPlase.addEventListener('click', closePopup);
popupImage.addEventListener('click', closePopup);

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
  openPopup(popupNewPlase);
});

buttonEditProfile.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupEditProfile);
});

buttonImage.addEventListener('click', () => {
  openPopup(popupImage);
});

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
}

// Функция отрытия попапа с картинкой
function openImagePopupCallback (buttonImage) {

        openPopup(popupImage);

        imageLink.src = buttonImage.src;
        imageAlt.textContent = buttonImage.alt;
        imageLink.setAttribute("alt", buttonImage.alt);

}
 









