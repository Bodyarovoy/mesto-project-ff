import { popupEditProfile, nameInput, profileTitle, jobInput, profileDescription} from '../index.js';
export { openModal, closeModal };


// Функция открытыя попапов
function openModal(popup) {
  popup.classList.add('popup_is-opened');
  // Если это попап редактирования профиля, заполняем форму
  if (popup === popupEditProfile) {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;   
  } 
    document.addEventListener('keydown', closeModal);
    popup.addEventListener('click', closeModal);
}

function closeModal(popup) {
  const activePopup = popup.currentTarget;
  const openPopup = document.querySelector('.popup_is-opened');

  // Закрытие по клику на оверлей или по кнопке закрытия
  if (popup.target === activePopup || popup.target.classList.contains('popup__close')) {
    openPopup.classList.remove('popup_is-opened');
    removeEventListeners();
  }
  // Закрытие по нажатию Escape
  if (popup.key === 'Escape') {  
    if (openPopup) {
      openPopup.classList.remove('popup_is-opened');
      removeEventListeners();
    }
  }
}

function removeEventListeners() {
  // Убираем обработчик на клик по оверлею
  const popups = document.querySelectorAll('.popup');
  popups.forEach(popup => {
    popup.removeEventListener('click', closeModal);
  });

  // Убираем обработчик на клавишу Escape
  document.removeEventListener('keydown', closeModal);
}