import { getRandomArrayElement } from '../utils.js';
import { POINT_TYPES } from '../const.js';

const mockOffers = [
  {
    type: 'taxi',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 100,
      },
      {
        id: 2,
        title: 'Upgrade to a business class',
        price: 200,
      },
    ],
  },
  {
    type: 'flight',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business flight',
        price: 101,
      },
      {
        id: 2,
        title: 'Upgrade to a business flight',
        price: 201,
      },
    ],
  },
  {
    type: 'bus',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business bus',
        price: 300,
      },
      {
        id: 2,
        title: 'Upgrade to a business bus',
        price: 400,
      },
    ],
  },
];

const destinationMock1 = {
  id: 1,
  description: 'Lorem lorem shuem',
  name: 'Paris',
  pictures: [
    {
      src: 'https://loremflickr.com/248/152?random=1',
      description: 'Paris picture placeholder',
    },
    {
      src: 'https://loremflickr.com/248/152?random=2',
      description: 'Another picture placeholder',
    },
  ],
};

const destinationMock2 = {
  id: 2,
  description: 'I am too lazy to write lorem text',
  name: 'Chamonix',
  pictures: [
    {
      src: 'https://loremflickr.com/248/152?random=3',
      description: 'Chamonix picture placeholder',
    },
    {
      src: 'https://loremflickr.com/248/152?random=4',
      description: 'Some other picture placeholder',
    },
  ],
};

const mockDestinations = [destinationMock1, destinationMock2];

const pointMock1 = {
  id: 0,
  type: getRandomArrayElement(POINT_TYPES),
  destination: 1,
  dateFrom: '2019-03-17T12:25',
  dateTo: '2019-03-17T13:35',
  basePrice: 160,
  offers: [1, 2],
};

const pointMock2 = {
  id: 1,
  type: getRandomArrayElement(POINT_TYPES),
  destination: 2,
  dateFrom: '2019-03-16T14:25',
  dateTo: '2019-03-16T15:35',
  basePrice: 260,
  offers: [1],
};

const mockPoints = [pointMock1, pointMock2];

const getOffersForPointType = (point) => mockOffers.find((offer) => offer.type === point.type);

const getDestinationForPointId = (point) => mockDestinations.find((destination) => destination.id === point.destination);

const getRandomPoint = () => getRandomArrayElement(mockPoints);

export { getRandomPoint, getOffersForPointType, getDestinationForPointId };
