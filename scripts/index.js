// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(cardContent, deleteCardCallback) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImageAttribute = cardElement.querySelector('.card__image');
    cardImageAttribute.src = cardContent.link;
    cardImageAttribute.alt = cardContent.name;
    cardElement.querySelector('.card__title').textContent = cardContent.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => deleteCardCallback(cardElement))

    return cardElement;
    }

// @todo: Функция удаления карточки
function deleteCardCallback(card) {
      card.remove();
    }
// @todo: Вывести карточки на страницу
initialCards.forEach((cardInfo) => {
    const card = createCard(cardInfo, deleteCardCallback);
    placesList.append(card);
});