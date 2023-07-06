import {photos} from './mock.js';
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

renderPack(photos, picturesContainer, (photo) => {
	const photoElement = createPhoto(photo);
	photoElement.addEventListener('click', () => openPhoto(photo));

	return photoElement;
});

