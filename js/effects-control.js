const uploadForm = document.querySelector('.img-upload__form');
const sliderElement = document.querySelector('.effect-level__slider');
const effectValueInput = document.querySelector('.effect-level__value');
const imagePreview = document.querySelector('.img-upload__preview img');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const effectsContainer = document.querySelector('.effects__list');

const filterValue = document.createElement('input');
filterValue.classList.add('filter-value');
filterValue.setAttribute('type', 'hidden');
filterValue.setAttribute('name', 'filter-value');
filterValue.setAttribute('value', '');
uploadForm.append(filterValue);

noUiSlider.create(sliderElement, {
	range: {
		min: 0,
		max: 0,
	},
	start: 0,
	step: 0,
	connect: 'lower'
});

const hideFilters = () => {
	sliderContainer.style.display = 'none';
};

const resetFilters = (min = 0, max = 1, step = 0.1) => {
	sliderElement.noUiSlider.updateOptions({
		range: {
			min,
			max,
		},
		start: 0,
		step,
	});
};

let choicedFilter = 'none';

hideFilters();

const changeEffect = () => {
	sliderContainer.style.display = '';
	switch(choicedFilter) {
	case 'chrome':
		resetFilters();
		break;
	case 'sepia':
		resetFilters();
		break;
	case 'marvin':
		resetFilters(0, 100, 1);
		break;
	case 'phobos':
		resetFilters(0, 3, 0.1);
		break;
	case 'heat':
		resetFilters(1, 3, 0.1);
		break;
	default:
		resetFilters();
		hideFilters();
	}
};

effectsContainer.addEventListener('change', (evt) => {
	choicedFilter = evt.target.value;
	changeEffect();
});

uploadForm.addEventListener('reset', (evt) => {
	choicedFilter = 'none';
	changeEffect();
});

sliderElement.noUiSlider.on('update', () => {
	effectValueInput.value = sliderElement.noUiSlider.get();
	switch(choicedFilter) {
	case 'chrome':
		imagePreview.style.filter = `grayscale(${effectValueInput.value})`;
		break;
	case 'sepia':
		imagePreview.style.filter = `sepia(${effectValueInput.value})`;
		break;
	case 'marvin':
		imagePreview.style.filter = `invert(${effectValueInput.value}100%)`;
		break;
	case 'phobos':
		imagePreview.style.filter = `blur(${effectValueInput.value}px)`;
		break;
	case 'heat':
		imagePreview.style.filter = `brightness(${effectValueInput.value})`;
		break;
	default:
		imagePreview.style.filter = '';
	}
	filterValue.value = imagePreview.style.filter;
});

export {};
