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

//Генератор случайных чисел в заданном диапазоне
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//Функция для извлечения случайной строки из массива
const randomIndexFromArray = (array) => getRandomInteger(0, array.length - 1);

//Функция-генератор ID
function createIdGenerator () {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
}

//Функция-генератор случайного числа в заданном диапазоне
function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const generatePhotoId = createRandomIdFromRangeGenerator(1, 25);
const generateCommentId = createIdGenerator();
const generateImageId = createRandomIdFromRangeGenerator(1, 25);

//Функция для создания объекта с комментарием
const getComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${ getRandomInteger(1, 6) }.svg`,
  message: MESSAGES[getRandomInteger(0, MESSAGES.length)],
  name: NAMES[getRandomInteger(0, NAMES.length)]
});

//Создаём случайное число комментариев

const getComments = () => {
  const array = [];
  for (let i = 0; i <= getRandomInteger(1,30); i++) {
    array.push(getComment());
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

const photoDescriptionArray = [];

while(photoDescriptionArray.length < 25) {
  photoDescriptionArray.push(getPhotoDescription());
}
