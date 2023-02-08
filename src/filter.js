import { FilterType } from './const.js';

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => Date.now() <= new Date(point.dateTo).getTime()),
};

export { filter };
