const getRandomInteger = (a, b) => {
	const lower = Math.ceil(Math.min(a, b));
	const upper = Math.floor(Math.max(a, b));
	const result = Math.random() * (upper - lower + 1) + lower;
	return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createRandomIdFromRangeGenerator = (min, max) => {
	const previousValues = [];
	return () => {
		if (previousValues.length >= (max - min + 1)) {
			return null;
		}
		let currentValue = getRandomInteger(min, max);
		while (previousValues.includes(currentValue)) {
			currentValue = getRandomInteger(min, max);
		}
		previousValues.push(currentValue);
		return currentValue;
	};
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const renderPack = (items, container, render) => {
	const fragment = document.createDocumentFragment();
	items.forEach((item) => fragment.append(render(item)));
	container.append(fragment);
};

const isUniqueArr = (array) => {
	const duplicates = array.filter((number, index, numbers) => numbers.indexOf(number) !== index);
	return duplicates.length <= 0;
};

const showAlert = (message) => {
	const alertContainer = document.createElement('div');
	alertContainer.style.zIndex = '100';
	alertContainer.style.position = 'absolute';
	alertContainer.style.left = '0';
	alertContainer.style.top = '0';
	alertContainer.style.right = '0';
	alertContainer.style.padding = '20px 10px';
	alertContainer.style.fontSize = '30px';
	alertContainer.style.textAlign = 'center';
	alertContainer.style.backgroundColor = 'red';

	alertContainer.textContent = message;

	document.body.append(alertContainer);

	setTimeout(() => {
		alertContainer.remove();
	}, 3000);
};

const debounce = (callback, timeoutDelay = 500) => {
	let timeoutId;
	return (...rest) => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
	};
};

export {getRandomInteger, getRandomArrayElement, createRandomIdFromRangeGenerator, isEscapeKey, renderPack, isUniqueArr, showAlert, debounce};
