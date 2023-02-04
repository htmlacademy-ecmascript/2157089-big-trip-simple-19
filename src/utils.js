import dayjs from 'dayjs';

const DATE_FORMAT = 'DD/MM/YY HH:mm';
const TIME_FORMAT = 'HH:mm';
const DAY_FORMAT = 'DD MMM';
const MACHINE_DAY_FORMAT = 'YYYY-MM-DD';
const MACHINE_TIME_FORMAT = 'YYYY-MM-DDThh:mm';

const fullDateFrom = (dateFrom) => dateFrom ? dayjs(dateFrom).format(DATE_FORMAT) : '';
const fullDateTo = (dateTo) => dateTo ? dayjs(dateTo).format(DATE_FORMAT) : '';
const machineDateTimeFrom = (dateFrom) => dateFrom ? dayjs(dateFrom).format(MACHINE_TIME_FORMAT) : '';
const machineDateTimeTo = (dateTo) => dateTo ? dayjs(dateTo).format(MACHINE_TIME_FORMAT) : '';
const dateTimeFrom = (dateFrom) => dateFrom ? dayjs(dateFrom).format(TIME_FORMAT) : '';
const dateTimeTo = (dateTo) => dateTo ? dayjs(dateTo).format(TIME_FORMAT) : '';
const dayDate = (dateFrom) => dateFrom ? dayjs(dateFrom).format(DAY_FORMAT) : '';
const machineDayDate = (dateFrom) => dateFrom ? dayjs(dateFrom).format(MACHINE_DAY_FORMAT) : '';


const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const getRandom = (items) => items[Math.floor(Math.random() * items.length)];

const sortPointDay = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));

const sortPointPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

const firstLetterUp = (item) => {
  if (!item) {
    return item;}
  return item[0].toUpperCase() + item.slice(1);
};

export {getRandomArrayElement, getRandom, fullDateFrom, fullDateTo, dateTimeFrom, dateTimeTo, dayDate, machineDayDate, machineDateTimeFrom, machineDateTimeTo, sortPointDay, sortPointPrice, firstLetterUp};
