import { cardTemplate } from '../index.js';
export { initialCards, createCard, deleteCardCallback, toggleLikeCallback };


const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

// Функция создания карточки

function createCard(cardContent, deleteCardCallback, toggleLikeCallback, openImagePopupCallback) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImageAttribute = cardElement.querySelector('.card__image');
    cardImageAttribute.src = cardContent.link;
    cardImageAttribute.alt = cardContent.name;
    cardElement.querySelector('.card__title').textContent = cardContent.name;


    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => deleteCardCallback(cardElement))

    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', () => toggleLikeCallback(likeButton));

    const buttonImage = cardElement.querySelector('.card__image');
    buttonImage.addEventListener('click', () => openImagePopupCallback(buttonImage));

    return cardElement;
}

// Функция удаления карточки
function deleteCardCallback(card) {
    card.remove();
}

// Функция лайка
function toggleLikeCallback (likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
};