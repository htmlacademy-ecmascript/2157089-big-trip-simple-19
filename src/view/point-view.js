import AbstractView from '../framework/view/abstract-view.js';
import { dayDate, dateTimeFrom, dateTimeTo, machineDayDate, machineDateTimeFrom, machineDateTimeTo } from '../utils';

const createSelectedOffersTemplate = (offers, pointTypeOffers) =>
  pointTypeOffers.offers.map((offer) =>
    offers.includes(offer.id) ?
      ` <li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
        </li>` : '').join('');

const createPointTemplate = (point) => {
  const { basePrice, type, offers, dateTo, dateFrom, offerByTypes, destination } = point;
  const pointTimeFrom = dateTimeFrom(dateFrom);
  const pointTimeTo = dateTimeTo(dateTo);
  const machinePointTimeFrom = machineDateTimeFrom(dateFrom);
  const machinePointTimeTo = machineDateTimeTo(dateTo);
  const pointDayDate = dayDate(dateFrom);
  const machinePointDayDate = machineDayDate(dateFrom);
  const selectOffersTemplate = createSelectedOffersTemplate(offers, offerByTypes);

  return (
    `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${machinePointDayDate}">${pointDayDate}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${`${type } ${ destination.name}`}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${machinePointTimeFrom}">${pointTimeFrom}</time>
          &mdash;
          <time class="event__end-time" datetime="${machinePointTimeTo}">${pointTimeTo}</time>
        </p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">

      ${selectOffersTemplate}

      </ul>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`
  );
};

export default class PointView extends AbstractView {
  #point = null;
  #handleEditClick = null;

  constructor({point,onEditClick}) {
    super();
    this.#point = point;
    this.#handleEditClick = onEditClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  }

  get template() {
    return createPointTemplate(this.#point);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };
}
