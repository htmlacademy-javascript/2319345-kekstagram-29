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

export {getRandomInteger, getRandomArrayElement, createRandomIdFromRangeGenerator, isEscapeKey, renderPack, isUniqueArr};
