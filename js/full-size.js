import {isEscapeKey} from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const bigImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = document.querySelector('.likes-count');
const photoDescription = document.querySelector('.social__caption');
const commentsCount = document.querySelector('.comments-count');
const commentBlock = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const closePhotoButton = bigPicture.querySelector('.big-picture__cancel');

commentsLoader.hidden = true;
socialCommentCount.hidden = true;

const renderComments = (comments) => {
	const fragment = document.createDocumentFragment();
	comments.forEach((comment) => {
		const commentElement = commentTemplate.cloneNode(true);
		const commentAvatar = commentElement.querySelector('.social__picture');
		commentAvatar.src = comment.avatar;
		commentAvatar.alt = comment.name;
		commentElement.querySelector('.social__text').textContent = comment.message;
		fragment.append(commentElement);
	});
	commentBlock.append(fragment);
};

const openPhoto = ({url, description, likes, comments}) => {
	bigPicture.classList.remove('hidden');
	document.body.classList.add('modal-open');
	bigImage.src = url;
	bigImage.alt = description;
	photoDescription.textContent = description;
	likesCount.textContent = likes.toString();
	commentsCount.textContent = comments.length.toString();
	renderComments(comments);
	document.addEventListener('keydown', onDocumentKeydown);
};

const closePhoto = () => {
	bigPicture.classList.add('hidden');
	document.body.classList.remove('modal-open');
	document.removeEventListener('keydown', onDocumentKeydown);
	commentBlock.innerHTML = '';
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
