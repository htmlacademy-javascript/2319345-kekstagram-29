import {isEscapeKey, isUniqueArr} from './utils.js';
import {sendData} from './api.js';
import {cancelUpload} from './form-upload.js';

const SubmitButtonText = {
	DEFAULT: 'Опубликовать',
	SENDING: 'Публикуем...'
};

const successContainer = document.querySelector('#success').content.querySelector('.success');
const successInner = successContainer.querySelector('.success__inner');
const successButton = successContainer.querySelector('.success__button');
const errorContainer = document.querySelector('#error').content.querySelector('.error');
const errorInner = errorContainer.querySelector('.error__inner');
const errorButton = errorContainer.querySelector('.error__button');
const uploadForm = document.querySelector('.img-upload__form');
const submitButton = uploadForm.querySelector('.img-upload__submit');
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

const blockSubmitButton = () => {
	submitButton.disabled = true;
	submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
	submitButton.disabled = false;
	submitButton.textContent = SubmitButtonText.DEFAULT;
};

const removeMessageModal = () => {
	[successContainer, errorContainer].forEach((container) => {
		container.style.display = 'none';
	});
	document.removeEventListener('keydown', onDocumentKeydown);
};

const createMessageModal = (container, inner) => {
	const fragment = document.createDocumentFragment();
	fragment.append(inner);
	container.append(fragment);
	document.body.insertAdjacentElement('beforeend', container);
	const addedContainer = document.querySelector(`body > section.${container.classList[0]}`);
	addedContainer.addEventListener('click', (evt) => {
		if (evt.target === container) {
			removeMessageModal();
		}
	});
};

const showMessageModal = (container, inner) => {
	document.addEventListener('keydown', onDocumentKeydown);
	const addedContainer = document.querySelector(`body > section.${container.classList[0]}`);

	if (addedContainer) {
		container.style.display = '';
	} else {
		createMessageModal(container, inner);
	}
};

[successButton, errorButton].forEach((button) => {
	button.addEventListener('click', () => {
		removeMessageModal();
	});
});

function onDocumentKeydown (evt) {
	if (isEscapeKey(evt)) {
		evt.preventDefault();
		removeMessageModal();
	}
}

uploadForm.addEventListener('submit', (evt) => {
	evt.preventDefault();
	const isValid = pristine.validate();
	if (isValid) {
		blockSubmitButton();
		sendData(new FormData(evt.target))
			.then(() => {
				showMessageModal(successContainer, successInner);
			})
			.then(cancelUpload)
			.catch(() => {
				showMessageModal(errorContainer, errorInner);
			})
			.finally(unblockSubmitButton);
	}
});

export {createMessageModal};
