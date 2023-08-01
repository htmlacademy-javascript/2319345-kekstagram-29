const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  POPULAR: 'filter-discussed'
};
const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';
const sortingElement = document.querySelector('.img-filters');

let currentFilter = Filter.DEFAULT;
let photos = [];

const sortInRandom = () => Math.random() - 0.5;

const sortInPopular = (photo1, photo2) =>
  photo2.comments.length - photo1.comments.length;

const getSortingPhotos = () => {
  switch (currentFilter) {
    case Filter.RANDOM:
      return [...photos].sort(sortInRandom).slice(0, 10);
    case Filter.POPULAR:
      return [...photos].sort(sortInPopular);
    default:
      return photos;
  }
};

const setOnFilterClick = (cb) => {
  sortingElement.addEventListener('click', (evt) => {
    const clickedButton = evt.target;
    const isButton = clickedButton.classList.contains('img-filters__button');
    const isCurrentFilter = clickedButton.id === currentFilter;

    if (!isButton || isCurrentFilter) {
      return;
    }

    sortingElement.querySelector(`.${ACTIVE_BUTTON_CLASS}`).classList.remove(ACTIVE_BUTTON_CLASS);
    clickedButton.classList.add(ACTIVE_BUTTON_CLASS);
    currentFilter = clickedButton.id;
    cb(getSortingPhotos());
  });
};

const init = (loadedPhotos, cb) => {
  sortingElement.classList.remove('img-filters--inactive');
  photos = loadedPhotos;
  setOnFilterClick(cb);
};

export {init, getSortingPhotos};
