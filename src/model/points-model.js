import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

const BLANK_POINT = {
  'base_price': '',
  'date_from': new Date(),
  'date_to': new Date(),
  destination: 0,
  offers: [],
  type: 'taxi'
};

export default class PointsModel extends Observable {
  #pointsApiService = null;
  #points = [];
  #offersByTypes = [];
  #destinations = [];

  constructor({pointsApiService}) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  get points() {
    return this.#points.map((point) => {
      const offerByTypes = this.#getOfferByTypes(point).offerByTypes;
      const destination = this.#getDestination(point).destination;
      const offersByTypes = this.#offersByTypes;
      const destinations = this.#destinations;

      return {
        ...point,
        destination,
        offerByTypes,
        offersByTypes,
        destinations
      };
    });
  }

  get blankPoint() {
    const offerByTypes = this.#getOfferByTypes(BLANK_POINT).offerByTypes;
    const destination = this.#getDestination(BLANK_POINT).destination;
    const offersByTypes = this.#offersByTypes;
    const destinations = this.#destinations;

    return {
      ...this.#adaptToClient(BLANK_POINT),
      destination,
      offerByTypes,
      offersByTypes,
      destinations
    };
  }

  #getOfferByTypes = (point) => {
    const offerByTypes = this.#offersByTypes.find((offer) => offer.type === point.type);
    return {offerByTypes};
  };

  #getDestination = (point) => {
    const destination = this.#destinations.find((direction) => direction.id === point.destination);
    return { destination};
  };

  async init() {
    try {
      const points = await this.#pointsApiService.points;
      const allOffers = await this.#pointsApiService.offers;
      const destinations = await this.#pointsApiService.destinations;
      this.#points = points.map(this.#adaptToClient);
      this.#offersByTypes = allOffers;
      this.#destinations = destinations;
    } catch(err) {
      this.#points = [];
    }

    this._notify(UpdateType.INIT);
  }

  async updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if(index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    try {
      const response = await this.#pointsApiService.updatePoint(update);
      const updatedPoint = this.#adaptToClient(response);

      this.#points = [
        ...this.#points.slice(0,index),
        updatedPoint,
        ...this.#points.slice(index + 1)
      ];

      this._notify(updateType, updatedPoint);
    } catch(err) {
      throw new Error('Can\'t update point');
    }
  }

  async addPoint(updateType, update) {
    try {
      const response = await this.#pointsApiService.addPoint(update);
      const newPoint = this.#adaptToClient(response);

      this.#points = [newPoint,...this.#points,];
      this._notify(updateType, update);
    } catch(err) {
      throw new Error('Can\'t update point');
    }
  }

  async deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    try {
      await this.#pointsApiService.deletePoint(update);
      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType);
    } catch(err) {
      throw new Error('Can\'t update point');
    }
  }

  #adaptToClient(point) {
    const adaptedPoint = {...point,
      basePrice: point['base_price'],
      dateFrom: new Date(point['date_from']),
      dateTo: new Date(point['date_to']),
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];

    return adaptedPoint;
  }
}
