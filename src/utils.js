import dayjs from 'dayjs';

const humanizeDate = (rawDate, format) => rawDate ? dayjs(rawDate).format(format) : '';

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const capitalizeFirstLetter = (string) => {
  string[0].toUpperCase();
  return string;
};

export { getRandomArrayElement, humanizeDate, capitalizeFirstLetter };
