import {isUniqueArr} from './utils.js';

const uploadForm = document.querySelector('.img-upload__form');
const hashtags = uploadForm.querySelector('input[name="hashtags"]');
let hashtagArr = [];

const pristine = new Pristine(uploadForm, {
	classTo: 'img-upload__field-wrapper',
	errorTextParent: 'img-upload__field-wrapper',
	errorTextTag: 'div',
	errorTextClass: 'img-upload__error-text',
}, false);

const validateDescription = (value) => value.length <= 140;

hashtags.addEventListener('blur', () => {
	hashtagArr = hashtags.value.trim().toLowerCase().split(' ').filter(Boolean);
});

const isValidHashtag = () => {
	const hashtagPattern = /^#(?=.*[^0-9])[a-zа-яё0-9]{1,19}$/i;
	return hashtagArr.every((item) => hashtagPattern.test(item));
};

const isValidAmount = () => hashtagArr.length < 5;

const isUniqueHashtag = () => isUniqueArr(hashtagArr);

pristine.addValidator(uploadForm.querySelector('.text__description'), validateDescription, 'не более 140 символов');

pristine.addValidator(hashtags, isValidHashtag, 'невалидный хэш-тег');
pristine.addValidator(hashtags, isValidAmount, 'не больше 5 хэш-тегов');
pristine.addValidator(hashtags, isUniqueHashtag, 'хэш-теги не должны повторяться');

uploadForm.addEventListener('submit', (evt) => {
	evt.preventDefault();
	pristine.validate();
});
