export { openPopup, closePopup };


// Функция открытия попапов
function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEsc);
    popup.addEventListener('click', closeByClick);
}

// Функция закрытия попапов
function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEsc);
    popup.removeEventListener('click', closeByClick);
  
}

// Обработчик закрытия по Escape
function closeByEsc(event) {
  if (event.key === 'Escape') {
      const openPopup = document.querySelector('.popup_is-opened');
      closePopup(openPopup);
    }

}

// Обработчик закрытия по клику на оверлей или кнопку закрытия
function closeByClick(event) {
   const activePopup = event.currentTarget;
   
if (event.target === activePopup || event.target.classList.contains('popup__close')) { 
      const openPopup = document.querySelector('.popup_is-opened');
      closePopup(openPopup);
  }
}

// function closePopup(popup) {
//   const activePopup = popup.currentTarget;
//   const openPopup = document.querySelector('.popup_is-opened');

//   // Закрытие по клику на оверлей или по кнопке закрытия
//   if (popup.target === activePopup || popup.target.classList.contains('popup__close')) {
//     openPopup.classList.remove('popup_is-opened');
//     removeEventListeners();
//   }
//   // Закрытие по нажатию Escape
//   if (popup.key === 'Escape') {  
//     if (openPopup) {
//       openPopup.classList.remove('popup_is-opened');
//       removeEventListeners();
//     }
//   }
// }

