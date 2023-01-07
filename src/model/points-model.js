import { getRandomPoint } from '../mock/mockData.js';
import { DESTINATIONS_COUNT } from '../const.js';

export default class PointsModel {
  points = Array.from({ length: DESTINATIONS_COUNT }, getRandomPoint);

  getPoints() {
    return this.points;
  }
}
