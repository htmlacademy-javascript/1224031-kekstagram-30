import {getRandomInteger, randomIndexFromArray, createIdGenerator, createRandomIdFromRangeGenerator} from './utils.js';
import {NAMES, MESSAGES, DESCRIPTIONS} from './data.js';

const PHOTOS_COUNT = 25;
const AVATARS_COUNT = 6;
const MIN_COMMENTS_COUNT = 1;
const MAX_COMMENTS_COUNT = 30;
const MIN_LIKES_COUNT = 15;
const MAX_LIKES_COUNT = 200;


const generatePhotoId = createRandomIdFromRangeGenerator(1, PHOTOS_COUNT);
const generateCommentId = createIdGenerator();
const generateImageId = createRandomIdFromRangeGenerator(1, PHOTOS_COUNT);

//Функция для создания объекта с комментарием
const getCommentObject = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${ getRandomInteger(1, AVATARS_COUNT) }.svg`,
  message: MESSAGES[getRandomInteger(0, MESSAGES.length - 1)],
  name: NAMES[getRandomInteger(0, NAMES.length)]
});

//Создаём случайное число комментариев
const getComments = () => {
  const array = [];
  for (let i = 0; i <= getRandomInteger(MIN_COMMENTS_COUNT,MAX_COMMENTS_COUNT); i++) {
    array.push(getCommentObject());
  }
  return array;
};

//Функция для создания объекта с описанием к фотографии
const getPhotoDescription = () => (
  {
    id: generatePhotoId(),
    url: `photos/${ generateImageId() }.jpg`,
    description: DESCRIPTIONS[randomIndexFromArray(DESCRIPTIONS)],
    likes: getRandomInteger(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
    comments: getComments()
  });

//Создаём массив объектов с комментариями
const getPhotoArray = () => {
  const photoDescriptionArray = [];

  while(photoDescriptionArray.length < PHOTOS_COUNT) {
    photoDescriptionArray.push(getPhotoDescription());
  }
  return photoDescriptionArray;
};

export {getPhotoArray};
