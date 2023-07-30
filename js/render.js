import {openPhoto} from './full-size.js';
import {renderPack} from './utils.js';

const picturesContainer = document.querySelector('.pictures');

const pictureTemplate = document.querySelector('#picture')
	.content
	.querySelector('.picture');

const createPhoto = ({ url, description, likes, comments }) => {
	const photoElement = pictureTemplate.cloneNode(true);
	const imageElement = photoElement.querySelector('.picture__img');
	imageElement.src = url;
	imageElement.alt = description;
	photoElement.querySelector('.picture__likes').textContent = likes.toString();
	photoElement.querySelector('.picture__comments').textContent = comments.length;

	return photoElement;
};

const renderedPhotos = (photos) => renderPack(photos, picturesContainer, (photo) => {
	picturesContainer.querySelectorAll('.picture').forEach((element) => element.remove());
	const photoElement = createPhoto(photo);
	photoElement.addEventListener('click', () => openPhoto(photo));

	return photoElement;
});

export {renderedPhotos};
