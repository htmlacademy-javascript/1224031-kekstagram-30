import { getPictures } from './get-pictures';
import { debounce, randomNumGenerator } from './utils';

const MAX_RANDOM_PICS = 10;

const filtersContainer = document.querySelector('.img-filters');
const filtersForm = document.querySelector('.img-filters__form');
const sortButtons = filtersContainer.querySelectorAll('.img-filters__button');
const defaultSortButton = filtersContainer.querySelector('#filter-default');
const randomSortButton = filtersContainer.querySelector('#filter-random');
const discussedSortButton = filtersContainer.querySelector('#filter-discussed');

const toggleActiveButton = (evt) => {
  if (evt.target.classList.contains('img-filters__button--active')) {
    return;
  }
  sortButtons.forEach((item) => item.classList.remove('img-filters__button--active'));
  evt.target.classList.add('img-filters__button--active');
};

const sortHandler = (evt, removePicturesFunction, pictures) => {

  //Сортировка по умолчанию
  if(evt.target === defaultSortButton) {
    toggleActiveButton(evt);
    removePicturesFunction();
    getPictures(pictures);
  }

  //10 рандомных картинок
  if(evt.target === randomSortButton) {
    toggleActiveButton(evt);
    let randomPics = [];
    const randomNum = randomNumGenerator(0, pictures.length - 1);
    for (let i = 0; i < pictures.length; i++) {
      const index = randomNum();
      randomPics.push(pictures[index]);
    }
    randomPics = randomPics.slice(0, MAX_RANDOM_PICS);
    removePicturesFunction();
    getPictures(randomPics);
  }

  //Сортировка по количеству комментариев
  if(evt.target === discussedSortButton) {
    toggleActiveButton(evt);
    const sortedPics = pictures.slice();
    sortedPics.sort((currentPicture,nextPicture) => nextPicture.comments.length - currentPicture.comments.length);
    removePicturesFunction();
    getPictures(sortedPics);
  }
};

const debouncedSort = debounce(sortHandler);
const enableSorting = (data) => {
  const removePicturesList = () => document.querySelectorAll('.picture')
    .forEach((item) => item.remove());

  filtersContainer.classList.remove('img-filters--inactive');

  filtersForm.addEventListener('click', (evt) => {
    debouncedSort(evt, removePicturesList, data);
  });
};

export {enableSorting};
