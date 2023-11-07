import {isEscapeKey} from './utils.js';

const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInterface = document.querySelector('.img-upload__overlay');
const uploadCloseButton = document.querySelector('.img-upload__cancel');

imgUploadInput.addEventListener('change', () => {
  imgUploadInterface.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
});

uploadCloseButton.addEventListener('click', () => {
  imgUploadInterface.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
});
imgUploadForm.addEventListener('keydown', (evt) => {
  if(isEscapeKey(evt)) {
    imgUploadInterface.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
  }
});
