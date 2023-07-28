const Filter = {
	DEFAULT: 'filter-default',
	RANDOM: 'filter-random',
	POPULAR: 'filter-discussed'
};
const sortingElement = document.querySelector('.img-filters');

let currentFilter = Filter.DEFAULT;
let photos = [];

const sortInRandom = () => Math.random() - 0.5;

const sortInPopular = (photo1, photo2) =>
	photo2.comments.length - photo1.comments.length;

const getSortingPhotos = () => {
	switch (currentFilter) {
	case Filter.RANDOM:
		return [...photos].sort(sortInRandom);
	case Filter.POPULAR:
		return [...photos].sort(sortInPopular);
	default:
		return [...photos];
	}
};

const setOnFilterClick = (cb) => {
	sortingElement.addEventListener('click', (evt) => {
		if (!evt.target.classList.contains('img-filters__button')) {
			return;
		}

		const clickedButton = evt.target;
		if (clickedButton.id === currentFilter) {
			return;
		}

		sortingElement.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
		clickedButton.classList.add('img-filters__button--active');
		currentFilter = clickedButton.id;
		cb(getSortingPhotos());
	});
};

const init = (loadedPhotos, cb) => {
	sortingElement.classList.remove('img-filters--inactive');
	photos = [...loadedPhotos];
	setOnFilterClick(cb);
};

export {init, getSortingPhotos};
