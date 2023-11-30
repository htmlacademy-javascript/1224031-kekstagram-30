import {isEscapeKey} from './utils';
import {sendServerData} from './server';
import {onScaleSmallerClick, onScaleBiggerClick, resetScale} from './photo-scale';
import {resetEffects} from './slider-effects';

const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAGS_COUNT = 5;
const HASHTAG_REGULAR = /^#[a-zа-яё0-9]{1,19}$/i;

const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInterface = document.querySelector('.img-upload__overlay');
const uploadCloseButton = document.querySelector('.img-upload__cancel');
const photoCommentInputField = imgUploadForm.querySelector('.text__description');
const photoHashtagsInputField = imgUploadForm.querySelector('.text__hashtags');
const effectValueInput = document.querySelector('.effect-level__value');

const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');

const submitButton = document.querySelector('.img-upload__submit');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});
const onModalKeydownClose = (evt) => {
  if(isEscapeKey(evt) && !document.querySelector('.error')) {
    // eslint-disable-next-line no-use-before-define
    onModalClickClose();
  }
};

const onModalClickClose = () => {
  imgUploadInterface.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  imgUploadInput.value = '';
  imgUploadForm.reset();
  pristine.reset();

  document.removeEventListener('keydown', onModalKeydownClose);
  uploadCloseButton.removeEventListener('click', onModalClickClose);
  scaleSmaller.removeEventListener('click', onScaleSmallerClick);
  scaleBigger.removeEventListener('click', onScaleBiggerClick);

  resetScale();
  resetEffects();
  submitButton.disabled = true;
};
const onModalClickOpen = () => {
  imgUploadInterface.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  uploadCloseButton.addEventListener('click', onModalClickClose);
  document.addEventListener('keydown', onModalKeydownClose);
  scaleSmaller.addEventListener('click', onScaleSmallerClick);
  scaleBigger.addEventListener('click', onScaleBiggerClick);

  effectValueInput.removeAttribute('value');
  submitButton.disabled = false;
};
imgUploadInput.addEventListener('change', onModalClickOpen);
photoCommentInputField.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});
photoHashtagsInputField.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

//Валидация описания фотографии
const validateComment = (value) => value.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(
  photoCommentInputField,
  validateComment,
  `Не более ${MAX_COMMENT_LENGTH} символов`
);
//Валидация хэш-тегов
const getHashtagNormalize = (tagString) => tagString
  .toLowerCase()
  .trim()
  .split(' ')
  .filter((tag) => Boolean(tag.length));
const validateHashtagSymbols = (value) => getHashtagNormalize(value).every((tag) => HASHTAG_REGULAR.test(tag));
const validateHashtagsCount = (value) => getHashtagNormalize(value).length <= MAX_HASHTAGS_COUNT;
const validateHashtagsUnic = (value) => getHashtagNormalize(value).length === new Set(getHashtagNormalize(value)).size;

pristine.addValidator(
  photoHashtagsInputField,
  validateHashtagSymbols,
  'Введите корректный хэш-тег'
);
pristine.addValidator(
  photoHashtagsInputField,
  validateHashtagsCount,
  `Не более ${MAX_HASHTAGS_COUNT} хэш-тегов`
);
pristine.addValidator(
  photoHashtagsInputField,
  validateHashtagsUnic,
  'Хэш-теги не должны повторяться'
);
imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if(pristine.validate()) {
    const formData = new FormData(evt.target);
    sendServerData(formData);
  }
});

export {onModalClickClose};
