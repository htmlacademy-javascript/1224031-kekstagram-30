import { getServerData } from './server';
import { getPictures } from './get-pictures';

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
  for(let i = 0; i < document.querySelectorAll('.picture').length; i++){
    const index = Math.floor(Math.random() * (document.querySelectorAll('.picture').length - 1)); // у тебя есть функция создающая уникальное значечене ей и воспользуйся
    newArr.push(document.querySelectorAll('.picture')[index]);
  }
  newArr = newArr.slice(0,10);
  document.querySelectorAll('.picture').forEach((item) => item.remove());
  newArr.forEach((item) => {
    document.querySelector('.pictures').append(item);
  });
});


export {initFilter};
