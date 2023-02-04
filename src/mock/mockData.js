const routPoints = [
  {
    basePrice: 1100,
    dateFrom: '2019-01-10T18:30:56.845Z',
    dateTo: '2019-01-11T19:15:13.375Z',
    destination: 1,
    offers: [1, 2],
    type: 'taxi'
  },
  {
    basePrice: 500,
    dateFrom: '2019-02-12T14:25:56.845Z',
    dateTo: '2019-02-13T16:42:13.375Z',
    destination: 1,
    offers: [1, 2],
    type: 'bus'
  },
  {
    basePrice: 800,
    dateFrom: '2019-03-15T04:55:56.845Z',
    dateTo: '2019-03-16T23:22:13.375Z',
    destination: 1,
    offers: [2, 3, 4],
    type: 'train'
  },
  {
    basePrice: 2100,
    dateFrom: '2019-04-16T15:20:56.845Z',
    dateTo: '2019-04-17T11:45:13.375Z',
    destination: 2,
    offers: [2, 3],
    type: 'ship'
  },
  {
    basePrice: 100,
    dateFrom: '2019-05-18T19:55:56.845Z',
    dateTo: '2019-05-19T16:22:13.375Z',
    destination: 2,
    offers: [1],
    type: 'drive'
  },
  {
    basePrice: 5000,
    dateFrom: '2019-06-20T12:55:56.845Z',
    dateTo: '2019-06-21T21:22:13.375Z',
    destination: 2,
    offers: [1, 2, 4],
    type: 'flight'
  },
  {
    basePrice: 2500,
    dateFrom: '2023-07-22T21:15:56.845Z',
    dateTo: '2023-07-23T12:30:13.375Z',
    destination: 3,
    offers: [1, 3],
    type: 'check-in'
  },
  {
    basePrice: 8000,
    dateFrom: '2023-08-24T17:20:56.845Z',
    dateTo: '2023-08-25T13:40:13.375Z',
    destination: 3,
    offers: [3, 4],
    type: 'sightseeing'
  },
  {
    basePrice: 300,
    dateFrom: '2023-09-26T22:55:56.845Z',
    dateTo: '2023-09-27T11:22:13.375Z',
    destination: 3,
    offers: [2, 4],
    type: 'restaurant'
  }
];

const offersByTypes = [
  {
    type: 'taxi',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 300
      },
      {
        id: 2,
        title: 'Additional passenger',
        price: 50
      },
      {
        id: 3,
        title: 'Select Radio',
        price: 10
      },
      {
        id: 4,
        title: 'Open a window',
        price: 5
      }
    ]
  },
  {
    type: 'bus',
    offers: [
      {
        id: 1,
        title: 'Take an extra seat',
        price: 80
      },
      {
        id: 2,
        title: 'Add luggage',
        price: 130
      },
      {
        id: 3,
        title: 'Switch to comfort class',
        price: 100
      },
      {
        id: 4,
        title: 'Choose seats',
        price: 40
      },
    ]
  },
  {
    type: 'train',
    offers: [
      {
        id: 1,
        title: 'Change the compartment',
        price: 120
      },
      {
        id: 2,
        title: 'Order lunch',
        price: 30
      },
      {
        id: 3,
        title: 'Pull the stopcock',
        price: 1000
      },
      {
        id: 4,
        title: 'Choose a shelf',
        price: 150
      }
    ]
  },
  {
    type: 'ship',
    offers: [
      {
        id: 1,
        title: 'Choose a boat',
        price: 120
      },
      {
        id: 2,
        title: 'Beep',
        price: 30
      },
      {
        id: 3,
        title: 'Turn the wheel',
        price: 100
      },
      {
        id: 4,
        title: 'Dance with the captain',
        price: 15
      },
    ]
  },
  {
    type: 'drive',
    offers: [
      {
        id: 1,
        title: 'Choose a car',
        price: 120
      },
      {
        id: 2,
        title: 'Choose a color',
        price: 30
      },
      {
        id: 3,
        title: 'Choose a travel companion',
        price: 100
      }
    ]
  },
  {
    type: 'flight',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 250
      },
      {
        id: 2,
        title: 'Add luggage',
        price: 30
      },
      {
        id: 3,
        title: 'Jump with a parachute',
        price: 800
      },
      {
        id: 4,
        title: 'Choose seats',
        price: 50
      },
    ]
  },
  {
    type: 'check-in',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 120
      },
      {
        id: 2,
        title: 'Add luggage',
        price: 30
      },
      {
        id: 3,
        title: 'Switch to comfort class',
        price: 100
      },
      {
        id: 4,
        title: 'Choose seats',
        price: 5
      }
    ]
  },
  {
    type: 'sightseeing',
    offers: [
      {
        id: 1,
        title: 'Order a map of attractions',
        price: 20
      },
      {
        id: 2,
        title: 'Order an audio guide',
        price: 35
      },
      {
        id: 3,
        title: 'Book a tour',
        price: 75
      },
      {
        id: 4,
        title: 'Travel by train',
        price: 140
      }
    ]
  },
  {
    type: 'restaurant',
    offers: [
      {
        id: 1,
        title: 'Order a dish from the chef',
        price: 520
      },
      {
        id: 2,
        title: 'Order a business lunch',
        price: 100
      },
      {
        id: 3,
        title: 'Add meal',
        price: 15
      },
      {
        id: 4,
        title: 'Choose seats',
        price: 55
      }
    ]
  }
];

const destinations = [
  {
    id: 1,
    description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Chamonix',
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=1',
        description: 'Chamonix parliament building'
      },
      {
        src: 'https://loremflickr.com/248/152?random=2',
        description: 'Chamonix parliament building'
      },
      {
        src: 'https://loremflickr.com/248/152?random=3',
        description: 'Chamonix parliament building'
      }
    ]
  },
  {
    id: 2,
    description: 'Amsterdam. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    name: 'Amsterdam',
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=11',
        description: 'Chamonix parliament building'
      },
      {
        src: 'https://loremflickr.com/248/152?random=12',
        description: 'Chamonix parliament building'
      },
      {
        src: 'https://loremflickr.com/248/152?random=13',
        description: 'Chamonix parliament building'
      },
      {
        src: 'https://loremflickr.com/248/152?random=14',
        description: 'Chamonix parliament building'
      }
    ]
  },
  {
    id: 3,
    description: 'Geneva. Cras aliquet varius magna, non porta ligula feugiat eget.',
    name: 'Geneva',
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=21',
        description: 'Chamonix parliament building'
      },
      {
        src: 'https://loremflickr.com/248/152?random=22',
        description: 'Chamonix parliament building'
      }
    ]
  }
];

export {routPoints, offersByTypes, destinations};
