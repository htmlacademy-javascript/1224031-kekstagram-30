import { getServerData } from './server';
import { getPictures } from './get-pictures';
import {getRandomInteger} from './utils';

const filtersContainer = document.querySelector('.img-filters');
const defaultFilterButton = document.querySelector('#filter-default');
const randomFilterButton = document.querySelector('#filter-random');
// const discussedFilterButton = document.querySelector('#filter-discussed');

const initFilter = () => filtersContainer.classList.remove('img-filters--inactive');

defaultFilterButton.addEventListener('click', () => {
  document.querySelectorAll('.picture').forEach((item) => item.remove());
  getServerData(getPictures);

});
randomFilterButton.addEventListener('click', () => {
  let newArr = [];
  const previousValues = [];
  for(let i = 0; i < document.querySelectorAll('.picture').length; i++){
    let index = getRandomInteger(0,24);
    while (previousValues.includes(index)) {
      index = getRandomInteger(0, 24);
    }
    previousValues.push(index);
    newArr.push(document.querySelectorAll('.picture')[index]);
  }
  newArr = newArr.slice(0,10);
  if(document.querySelectorAll('.picture').length !== 10){
    document.querySelectorAll('.picture').forEach((item) => item.remove());
    newArr.forEach((item) => {
      document.querySelector('.pictures').append(item);
    });
  } else {
    document.querySelectorAll('.picture').forEach((item) => item.remove());
    getServerData(getPictures);
  }
});


export {initFilter};
