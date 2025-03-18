import '../pages/index.css';
import { createCard, deleteCardCallback, toggleLikeCallback } from './components/card.js';
import { openPopup, closePopup, closeByClick } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getProfileInfo, updateProfileInfo, addNewCardToServer, receiveCards, updateAvatar} from './components/api.js';

// Конфиг для валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}; 

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// DOM узлы
const placesList = document.querySelector('.places__list');

// Добавление новой карточки
const formElementNewCard = document.querySelector('.popup_type_new-card');
const cardInput = document.querySelector('.popup__input_type_card-name');
const urlInput = document.querySelector('.popup__input_type_url');

// Открытие попапов
const popupNewPlase = document.querySelector('.popup_type_new-card');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupEditIcon = document.querySelector('.popup_type_edit-icon');
const popupImage = document.querySelector('.popup_type_image');

const buttonNewPlase = document.querySelector('.profile__add-button');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonEditIcon = document.querySelector('.profile__image');

//Изменение данных профиля
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

// Изменение аватара
const editAvatarInput = document.querySelector('.popup__input_type_edit-icon');

// Добавление карточки с картинкой
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

// Сохранение данных формы 
const formElementEdit = document.querySelector('.popup_type_edit');

// Слушатель сохранения данных профиля
formElementEdit.addEventListener('submit', handleFormElementEditSubmit);

// Слушатель сохранения аватара
popupEditIcon.addEventListener('submit', handleNewAvatar); 

// Анимация попапов
const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
    popup.classList.add('popup_is-animated');
        popup.querySelector('.popup__button');
});

// Слушатели открытия попапов
buttonNewPlase.addEventListener('click', () => {
  clearValidation(popupNewPlase, validationConfig);
  openPopup(popupNewPlase);
    
});

buttonEditProfile.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(popupEditProfile, validationConfig);
  openPopup(popupEditProfile);
});

buttonEditIcon.addEventListener('click', () => {
  const editIcon = getComputedStyle(profileImage).backgroundImage;
  const imageUrl = editIcon.replace(/url\(["']?(.*?)["']?\)/, '$1'); 
  editAvatarInput.value = imageUrl;
  clearValidation(popupEditIcon, validationConfig);
  openPopup(popupEditIcon);
});

// Обработчик сохранения данных профиля
function handleFormElementEditSubmit(evt) {
  evt.preventDefault();

  formElementEdit.querySelector('.popup__button').textContent = 'Сохранение...'; 

  updateProfileInfo(nameInput.value, jobInput.value)
    .then(updatedProfile => {     
      profileTitle.textContent = updatedProfile.name;
      profileDescription.textContent = updatedProfile.about 
      console.log('Профиль успешно обновлен на сервере, статус код:', updatedProfile);
  
      closePopup(formElementEdit);   
    })
    .catch(err => {
      console.error('Ошибка при обновлении профиля на сервере:', err);
    })
    .finally(() => {
      formElementEdit.querySelector('.popup__button').textContent = 'Сохранить' 
    })
}

// Обработчик добавления новой карточки
function handleFormElementNewCardSubmit(evt) {
  evt.preventDefault();
  formElementNewCard.querySelector('.popup__button').textContent = 'Сохранение...'; 

  // Добавляем новую карточку
  addNewCardToServer(cardInput.value, urlInput.value)
    .then(newCardInfo => {  
      console.log('Ответ от сервера:', newCardInfo);
        const newCard = createCard({ 
          name: cardInput.value, 
          link: urlInput.value, 
          _id: newCardInfo._id, 
          owner: { _id: newCardInfo.owner._id },
          likes: newCardInfo.likes
        }, deleteCardCallback, toggleLikeCallback, openImagePopupCallback, newCardInfo.owner._id);
        
        placesList.prepend(newCard); 
        closePopup(formElementNewCard);  

    })
  .catch(err => {
    console.error('Ошибка при добавлении картинки на сервере:', err);
  })
  .finally(function () {
    formElementNewCard.querySelector('.popup__button').textContent = 'Сохранить' 
  })
}

  // Обработчик изменения аватава
function handleNewAvatar(evt) {
  evt.preventDefault();

  popupEditIcon.querySelector('.popup__button').textContent = 'Сохранение...'; 

  updateAvatar(editAvatarInput.value)
    .then(updatedAvatar => {
      document.querySelector('.profile__image').style.backgroundImage = `url('${updatedAvatar.avatar}')`;  
      closePopup(popupEditIcon);      
    })
    .catch(err => {
      console.error('Ошибка при обновлении аватара профиля на сервере:', err);
    })
    .finally(function () {
      popupEditIcon.querySelector('.popup__button').textContent = 'Сохранить'
    })   
}

// Функция отрытия попапа с картинкой
function openImagePopupCallback (buttonImage) {
  openPopup(popupImage);
  imageLink.src = buttonImage.src;
  imageAlt.textContent = buttonImage.alt;
  imageLink.setAttribute("alt", buttonImage.alt);
}



// Загрузка информации с сервера на страницу    
Promise.all([getProfileInfo(), receiveCards()])
.then(([profileInfo, initialCards]) => initialCards.forEach((initialCard) => {
 
  // Заполняем данные профиля
  profileTitle.textContent = profileInfo.name;
  profileDescription.textContent = profileInfo.about;
  document.querySelector('.profile__image').style.backgroundImage = `url('${profileInfo.avatar}')`;
  
  // Загружаем карточки на страницу
  const card = createCard(initialCard, deleteCardCallback, toggleLikeCallback, openImagePopupCallback, profileInfo._id);
  placesList.append(card);
  

  // Проверяем поставлен ли лайк и делаем кнопку лайка активной
  const likeButton = card.querySelector('.card__like-button');
  //   if (initialCard.likes.some(like => like._id === profileInfo._id)) {
  //   likeButton.classList.add('card__like-button_is-active');
  // } 
}) 
)

// Вызов функции включения валидации
enableValidation(validationConfig);

// Вызов функции очистки ошибок валидации 
clearValidation(popupEditProfile, validationConfig); 

export { cardTemplate };