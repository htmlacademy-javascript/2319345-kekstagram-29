import {createPhotoCollection} from './mock.js';

const picturesContainer = document.querySelector('.pictures');

const pictureTemplate = document.querySelector('#picture')
	.content
	.querySelector('.picture');

const photos = createPhotoCollection();

const photosFragment = document.createDocumentFragment();

photos.forEach(({url, description, likes, comments}) => {
	const photoElement = pictureTemplate.cloneNode(true);
	const imageElement = photoElement.querySelector('.picture__img');
	imageElement.src = url;
	imageElement.alt = description;
	photoElement.querySelector('.picture__likes').textContent = likes.toString();
	photoElement.querySelector('.picture__comments').textContent = comments.length;
	photosFragment.appendChild(photoElement);
});

picturesContainer.appendChild(photosFragment);
