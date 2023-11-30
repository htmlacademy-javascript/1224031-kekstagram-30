const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;

const scaleValue = document.querySelector('.scale__control--value');
const photo = document.querySelector('.img-upload__preview img');

const onScaleSmallerClick = () => {
  if (parseInt(scaleValue.value, 10) - SCALE_STEP >= SCALE_MIN) {
    scaleValue.value = `${parseInt(scaleValue.value, 10) - SCALE_STEP}%`;
    photo.style.transform = `scale(${scaleValue.value})`;
  }
};
const onScaleBiggerClick = () => {
  if(parseInt(scaleValue.value, 10) + SCALE_STEP <= SCALE_MAX) {
    scaleValue.value = `${parseInt(scaleValue.value, 10) + SCALE_STEP}%`;
    photo.style.transform = `scale(${scaleValue.value})`;
  }
};

const resetScale = () => {
  photo.style.transform = '';
  scaleValue.value = '100%';
};

export {onScaleSmallerClick, onScaleBiggerClick, resetScale};
