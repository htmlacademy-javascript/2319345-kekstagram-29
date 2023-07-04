import {photos} from './mock.js';
import {openPhoto} from './full-size.js';

const picturesContainer = document.querySelector('.pictures');

const pictureTemplate = document.querySelector('#picture')
	.content
	.querySelector('.picture');

const photosFragment = document.createDocumentFragment();

const renderPhoto = (photo) => {
	const { url, description, likes, comments } = photo;
	const photoElement = pictureTemplate.cloneNode(true);
	const imageElement = photoElement.querySelector('.picture__img');

	photoElement.addEventListener('click', (evt) => {
		evt.preventDefault();
		openPhoto(photo);
	});
	imageElement.src = url;
	imageElement.alt = description;
	photoElement.querySelector('.picture__likes').textContent = likes.toString();
	photoElement.querySelector('.picture__comments').textContent = comments.length;
	photosFragment.append(photoElement);
};

photos.forEach(renderPhoto);

picturesContainer.append(photosFragment);
