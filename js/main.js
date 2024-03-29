import {renderedPhotos} from './render.js';
import './form-upload.js';
import './form-validation.js';
import './scale-control.js';
import './effects-control.js';
import {getData} from './api.js';
import {showAlert, debounce} from './utils.js';
import {init, getSortingPhotos} from './sorting.js';
import './preview.js';

getData()
  .then((photos) => {
    const debouncedRenderGallery = debounce(renderedPhotos);
    init(photos, debouncedRenderGallery);
    renderedPhotos(getSortingPhotos());
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );
