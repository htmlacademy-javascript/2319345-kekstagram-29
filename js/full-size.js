import {isEscapeKey} from './utils.js';
import {renderComments, clearComments} from './comments.js';

const bigPicture = document.querySelector('.big-picture');
const bigImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = document.querySelector('.likes-count');
const photoDescription = document.querySelector('.social__caption');
const closePhotoButton = bigPicture.querySelector('.big-picture__cancel');

const renderPhoto = ({url, description, likes, comments}) => {
  bigImage.src = url;
  bigImage.alt = description;
  photoDescription.textContent = description;
  likesCount.textContent = likes.toString();
  renderComments(comments);
};

const openPhoto = (photo) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  renderPhoto(photo);
  document.addEventListener('keydown', onDocumentKeydown);
};

const closePhoto = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  clearComments();
};

closePhotoButton.addEventListener('click', () => {
  closePhoto();
});

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePhoto();
  }
}

export {openPhoto};
