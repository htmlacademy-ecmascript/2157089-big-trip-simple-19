import Observable from '../framework/observable.js';
import { getRandomArrayElement } from '../utils';
import { routPoints, offersByTypes, destinations } from '../mock/mockData.js';
import { nanoid } from 'nanoid';

const POINT_COUNT = 5;

const getRandomPoint = () => ({
  id:nanoid(),
  ...getRandomArrayElement(routPoints)});

export default class PointsModel extends Observable {
  #points = Array.from({length: POINT_COUNT}, getRandomPoint);
  #allOffers = offersByTypes;
  #destinations = destinations;

  get points() {
    return this.#points.map((point) => {
      const offerByTypes = this.#allOffers.find((offer) => offer.type === point.type);
      const destination = this.#destinations.find((direction) => direction.id === point.destination);

      return {
        ...point,
        destination,
        offerByTypes,
        offersByTypes,
        destinations
      };
    });
  }

  updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if(index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0,index),
      update,
      ...this.#points.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  }
}
