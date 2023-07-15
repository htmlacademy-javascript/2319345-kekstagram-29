const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const scaleInput = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');
const step = 25;
let currentScale = 100;

const changeScale = () => {
	scaleInput.value = `${currentScale}%`;
	imagePreview.style.transform = `scale(${currentScale / 100})`;
};

const scaleUp = () => {
	if (currentScale >= 25 && currentScale < 100) {
		currentScale += step;
		changeScale();
	}
};

const scaleDown = () => {
	if (currentScale > 25 && currentScale <= 100) {
		currentScale -= step;
		changeScale();
	}
};

biggerButton.addEventListener('click', () => {
	scaleUp();
});

smallerButton.addEventListener('click', () => {
	scaleDown();
});

