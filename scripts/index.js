// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(cardContent) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__image').src = cardContent.link;
    cardElement.querySelector('.card__image').alt = cardContent.name;
    cardElement.querySelector('.card__title').textContent = cardContent.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => deleteCard(cardElement));

    return cardElement;
    }

// @todo: Функция удаления карточки
function deleteCard(card) {
      card.remove();
    }
// @todo: Вывести карточки на страницу
initialCards.forEach((cardInfo) => {
    const card = createCard(cardInfo);
    placesList.append(card);
});