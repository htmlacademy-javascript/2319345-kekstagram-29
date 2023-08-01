import {isEscapeKey} from './utils.js';

const uploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = uploadForm.querySelector('.img-upload__input');
const hashtags = uploadForm.querySelector('input[name="hashtags"]');
const textDescription = uploadForm.querySelector('.text__description');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const cancelUploadButton = uploadForm.querySelector('.img-upload__cancel');

const startUpload = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const cancelUpload = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadForm.reset();
  document.removeEventListener('keydown', onDocumentKeydown);
};

imgUploadInput.addEventListener('change', () => {
  startUpload();
});

cancelUploadButton.addEventListener('click', () => {
  cancelUpload();
});

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    const errorContainer = document.querySelector('body > section.error');

    if (errorContainer && !errorContainer.style.display) {
      return;
    }

    evt.preventDefault();
    cancelUpload();
  }
}

[hashtags, textDescription].forEach((item) => {
  item.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.stopPropagation();
    }
  });
});

export {startUpload, cancelUpload};
