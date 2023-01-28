import AbstractView from '../framework/view/abstract-view.js';
import { humanizeDate, capitalizeFirstLetter } from '../utils.js';
import { DATE_FORMAT_DAY_AND_MONTH, DATE_FORMAT_TIME_ONLY } from '../const.js';
import { getOffersForPointType, getDestinationForPointId } from '../mock/mockData.js';

const renderOffersForPointType = (offers) => offers.map((offer) => `<li class="event__offer">
  <span class="event__offer-title">${offer.title}</span>
  &plus;&euro;&nbsp;
  <span class="event__offer-price">${offer.price}</span>
  </li>`).join('');

const createPointTemplate = (point) => {
  const offersForPointType = getOffersForPointType(point);
  const {basePrice, dateFrom, dateTo, type} = point;
  return `<li class="trip-events__item"><div class="event">
  <time class="event__date" datetime="${dateFrom}">${humanizeDate(dateFrom, DATE_FORMAT_DAY_AND_MONTH)}</time>
  <div class="event__type">
    <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
  </div>
  <h3 class="event__title">${capitalizeFirstLetter(type)} ${getDestinationForPointId(point).name}</h3>
  <div class="event__schedule">
    <p class="event__time">
      <time class="event__start-time" datetime="${dateFrom}">${humanizeDate(dateFrom, DATE_FORMAT_TIME_ONLY)}</time>
      &mdash;
      <time class="event__end-time" datetime="${dateTo}">${humanizeDate(dateTo, DATE_FORMAT_TIME_ONLY)}</time>
    </p>
  </div>
  <p class="event__price">
    &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
  </p>
  <h4 class="visually-hidden">Offers:</h4>
  <ul class="event__selected-offers">
    ${renderOffersForPointType(offersForPointType.offers)}
  </ul>
  <button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>
</div></li>`;
};

export default class PointView extends AbstractView {
  #point = null;
  #editButtonClickHandler = null;

  constructor (point, onEdit) {
    super();
    this.#point = point;
    this.#editButtonClickHandler = onEdit;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editButtonClickHandler);
  }

  get template () {
    return createPointTemplate(this.#point);
  }
}
