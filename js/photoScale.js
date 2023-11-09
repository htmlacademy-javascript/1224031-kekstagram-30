const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const photo = document.querySelector('.img-upload__preview img');

const getPictureSmaller = () => {
  scaleValue.value = `${parseInt(scaleValue.value, 10) - 25}%`;
  photo.style.transform = scaleValue.value;
  if(parseInt(scaleValue.value, 10) === 25) {
    scaleSmaller.removeEventListener('click', getPictureSmaller);
    // eslint-disable-next-line no-use-before-define
    scaleBigger.addEventListener('click', getPictureBigger);
  }
};
const getPictureBigger = () => {
  scaleValue.value = `${parseInt(scaleValue.value, 10) + 25}%`;
  photo.style.transform = scaleValue.value;
  if(parseInt(scaleValue.value, 10) === 100) {
    scaleSmaller.addEventListener('click', getPictureSmaller);
    scaleBigger.removeEventListener('click', getPictureBigger);
  }
};

scaleSmaller.addEventListener('click', getPictureSmaller);


