import {renderedPhotos} from './render.js';
import './form-upload.js';
import './form-validation.js';
import './scale-control.js';
import './effects-control.js';
import {getData} from './api.js';
import {showAlert} from './utils.js';
import {setUserFormSubmit} from './form-validation.js';
import {cancelUpload} from './form-upload.js';

getData()
	.then(renderedPhotos)
	.catch(
		(err) => {
			showAlert(err.message);
		}
	);

setUserFormSubmit(cancelUpload);
