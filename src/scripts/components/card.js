import { cardTemplate } from '../index.js';
import { deleteCardFromServer, addLikeToCardOnServer, removeLikeFromCardOnServer } from './api.js';

// Функция создания карточки
function createCard(cardContent, deleteCardCallback, toggleLikeCallback, openImagePopupCallback, userId) {
  
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImageAttribute = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');

  cardImageAttribute.src = cardContent.link;
  cardImageAttribute.alt = cardContent.name;
  cardTitle.textContent = cardContent.name;
  
  const deleteButton = cardElement.querySelector('.card__delete-button');
  // Проверяем владельца карточки и убираем кнопку удаления
  if (userId !== cardContent.owner._id) {
    deleteButton.classList.add('card__delete-button_closed');
  }
  // Добавляем слушатель на кнопку удаления
  deleteButton.addEventListener('click', () => deleteCardCallback(cardContent._id, cardElement));

  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');
  // Отображаем количесво лайков
  likeCounter.textContent = cardContent.likes.length;
  // Проверяем поставлен ли лайк юзером
  if (cardContent.likes.some(like => like._id === userId)) {
  likeButton.classList.add('card__like-button_is-active');
  } 
  // Добавляем слушатель на кнопку лайка
  likeButton.addEventListener('click', () => toggleLikeCallback(cardContent, cardElement));

  const buttonImage = cardElement.querySelector('.card__image');
  buttonImage.addEventListener('click', () => openImagePopupCallback(buttonImage));

  return cardElement;
}

// Функция удаления карточки
function deleteCardCallback(cardId, cardElement) {
  deleteCardFromServer(cardId, cardElement)
  .then(() => {
    cardElement.remove();
  })
}

// Функция лайка
function toggleLikeCallback(cardInfo, cardElement) {
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');

  const isLiked = likeButton.classList.contains('card__like-button_is-active');

  const likePromise = isLiked 
    ? removeLikeFromCardOnServer(cardInfo._id) 
    : addLikeToCardOnServer(cardInfo._id);

  likePromise
    .then(updatedCard => {
      likeCounter.textContent = updatedCard.likes.length;
      likeButton.classList.toggle('card__like-button_is-active', !isLiked);
    })
}

export { createCard, deleteCardCallback, toggleLikeCallback };