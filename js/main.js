import {renderedPhotos} from './render.js';
import './form-upload.js';
import './form-validation.js';
import './scale-control.js';
import './effects-control.js';
import {getData} from './api.js';
import {showAlert, debounce} from './utils.js';
import {init, getSortingPhotos} from './sorting.js';

getData()
	.then(renderedPhotos)
	.catch(
		(err) => {
			showAlert(err.message);
		}
	);

try {
	const data = await getData();
	const debouncedRenderGallery = debounce(renderedPhotos);
	init(data, debouncedRenderGallery);
	renderedPhotos(getSortingPhotos());
} catch (err) {
	showAlert(err.message);
}
