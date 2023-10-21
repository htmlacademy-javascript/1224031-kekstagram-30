import {getRandomInteger, randomIndexFromArray, createIdGenerator, createRandomIdFromRangeGenerator} from './utils.js';

const NAMES = [
  'Александр',
  'Кирилл',
  'Кира',
  'Данила',
  'Алиса',
  'Сергей',
  'Илья',
  'Василий',
  'Ариана',
  'Иван',
  'Александра',
  'Даниил',
  'Давид',
  'Анна',
  'София'
];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = [
  'Вся красота мира в одной картинке',
  'Моменты, которые запечатлены навсегда',
  'Счастье в каждом кадре',
  'Когда слова не нужны, достаточно фотографии',
  'История, рассказанная через объектив',
  'Остановить время в одном кадре',
  'Фотография — это способ улыбнуться в будущем',
  'Сегодня — самый лучший день',
];

const generatePhotoId = createRandomIdFromRangeGenerator(1, 25);
const generateCommentId = createIdGenerator();
const generateImageId = createRandomIdFromRangeGenerator(1, 25);

//Функция для создания объекта с комментарием
const getCommentObject = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${ getRandomInteger(1, 6) }.svg`,
  message: MESSAGES[getRandomInteger(0, MESSAGES.length)],
  name: NAMES[getRandomInteger(0, NAMES.length)]
});

//Создаём случайное число комментариев
const getComments = () => {
  const array = [];
  for (let i = 0; i <= getRandomInteger(1,30); i++) {
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
    likes: getRandomInteger(15, 200),
    comments: getComments()
  });

//Создаём массив объектов с комментариями
const getPhotoArray = () => {
  const photoDescriptionArray = [];

  while(photoDescriptionArray.length < 25) {
    photoDescriptionArray.push(getPhotoDescription());
  }
  return photoDescriptionArray;
};

export {getPhotoArray};
