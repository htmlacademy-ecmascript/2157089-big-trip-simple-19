import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { fullDateFrom, fullDateTo, firstLetterUp } from '../utils.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const createSectionOffersTemplate = (allOffers, offerByTypes) => {

  const createAdditionOptionsTemplate = (offers, pointTypeOffers) =>
    pointTypeOffers.offers.map((offer) => {
      const checked = offers.includes(offer.id) ? 'checked' : '';
      return (
        ` <div class="event__offer-selector">
                  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}" type="checkbox" name="event-offer-luggage" data-offer-id="${offer.id}" ${checked} >
                  <label class="event__offer-label" for="event-offer-${offer.id}">
                    <span class="event__offer-title">${offer.title}</span>
                    &plus;&euro;&nbsp;
                    <span class="event__offer-price">${offer.price}</span>
                  </label>
                </div>`);
    }).join('');

  const additionOptionsTemplate = createAdditionOptionsTemplate(allOffers, offerByTypes);

  if (offerByTypes.offers.length !== 0) {
    return (
      `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
        ${additionOptionsTemplate}
        </div>
      </section>`);
  } else {
    return '';
  }
};

const createDestinationNameTemplate = (destinations) =>
  destinations.map((destination) =>
    ` <option value="${destination.name}"></option>`
  ).join('');

const createPicturesTemplate = (pictures) =>
  pictures.map((picture) =>
    ` <img class="event__photo" src="${picture.src}" alt="${picture.description}">`
  ).join('');

const createEventTypeItemTemplate = (offersByTypes, type, id) =>
  offersByTypes.map((offer) => {
    const checkedType = offer.type.includes(type) ? 'checked' : '';
    return (
      `<div class="event__type-item">
      <input id="event-type-${offer.type}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${offer.type}" ${checkedType}>
      <label class="event__type-label  event__type-label--${offer.type}" for="event-type-${offer.type}-${id}">${firstLetterUp(offer.type)}</label>
    </div>`);
  }).join('');


const createEditPointFormTemplate = (point) => {

  const { basePrice, dateFrom, dateTo, destination, type, offers, id, offerByTypes, offersByTypes, destinations } = point;

  const pointDateTo = fullDateTo(dateTo);
  const pointDateFrom = fullDateFrom(dateFrom);
  const picturesTemplate = createPicturesTemplate(destination.pictures);
  const eventTypeItemTemplate = createEventTypeItemTemplate(offersByTypes, type, id);
  const destinationNameTemplate = createDestinationNameTemplate(destinations);

  const createSectionTemplate = createSectionOffersTemplate(offers, offerByTypes);

  return (
    `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>

                        ${eventTypeItemTemplate}

                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                     ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-${id}">
                    <datalist id="destination-list-${id}">
                      ${destinationNameTemplate}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${pointDateFrom}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${pointDateTo}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-${id}">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${basePrice}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                     ${createSectionTemplate}
                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${destination.description}</p>

                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                      ${picturesTemplate}
                      </div>
                    </div>
                  </section>
                </section>
              </form>
            </li>`
  );
};

export default class EditPointFormView extends AbstractStatefulView {
  #handleFormSubmit = null;
  #handleEditCloseClick = null;
  #handleDeleteClick = null;
  #datepickerStart = null;
  #datepickerEnd = null;

  constructor({point, onFormSubmit, onEditCloseClick, onDeleteClick}) {
    super();
    this._setState(EditPointFormView.parsePointToState(point));
    this.#handleFormSubmit = onFormSubmit;
    this.#handleEditCloseClick = onEditCloseClick;
    this.#handleDeleteClick = onDeleteClick;

    this._restoreHandlers();
  }

  get template() {
    return createEditPointFormTemplate(this._state);
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerStart) {
      this.#datepickerStart.destroy();
      this.#datepickerStart = null;
    }

    if (this.#datepickerEnd) {
      this.#datepickerEnd.destroy();
      this.#datepickerEnd = null;
    }
  }

  reset(point) {
    this.updateElement(
      EditPointFormView.parsePointToState(point)
    );
  }

  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editCloseHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#eventTypeHandler);
    this.element.querySelector('.event__field-group--destination').addEventListener('change', this.#eventDestinationHandler);
    this.element.querySelector('.event__field-group--price').addEventListener('change', this.#eventPriceHandler);
    if (this.element.querySelector('.event__section--offers') !== null) {
      this.element.querySelector('.event__section--offers').addEventListener('change', this.#eventOfferSelectorHandler);
    }
    this.#setDatepickerStart();
    this.#setDatepickerEnd();
  }

  #eventOfferSelectorHandler = () => {
    if (this.element.querySelector('.event__section--offers') !== null) {
      const inputs = this.element.querySelector('.event__available-offers').querySelectorAll('input');
      const offers = [];

      for ( const input of inputs) {
        if (input.checked) {
          offers.push(Number(input.dataset.offerId));
        }
      }
      this._setState({offers: offers});
    }
  };

  #eventTypeHandler = (evt) => {
    const newType = evt.target.value;
    const newOfferByTypes = this._state.offersByTypes.find((offer) => offer.type === newType);

    this.updateElement({
      type: newType,
      offerByTypes: newOfferByTypes,
      offers:[]
    });
  };

  #eventDestinationHandler = (evt) => {
    const newName = evt.target.value;
    const newDestination = this._state.destinations.find((direction) => direction.name === newName);
    if (newDestination) {
      this.updateElement({
        destination : newDestination
      });
    }
  };

  #eventPriceHandler = (evt) => {
    const prevPrice = this._state.basePrice;
    const newPrice = evt.target.value;
    const REGEX = /^[\D0]+|\D/g;
    if(!REGEX.test(newPrice)) {
      this._setState({basePrice: Number(newPrice)});
    } else {
      evt.target.value = prevPrice;
    }
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditPointFormView.parseStateToPoint(this._state));
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EditPointFormView.parseStateToPoint(this._state));
  };

  #editCloseHandler = () => {
    this.#handleEditCloseClick();
  };

  #dateStartChangeHandler = ([userDate]) => {
    this._setState({dateFrom: userDate});
  };

  #dateEndChangeHandler = ([userDate]) => {
    this._setState({dateTo: userDate});
  };

  #setDatepickerStart() {
    this.#datepickerStart = flatpickr(
      this.element.querySelector('[name=event-start-time]'),
      {
        dateFormat: 'd/m/y H:i',
        'time_24hr': true,
        enableTime: true,
        onChange: this.#dateStartChangeHandler,
      }
    );
  }

  #setDatepickerEnd() {
    this.#datepickerEnd = flatpickr(
      this.element.querySelector('[name=event-end-time]'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        'time_24hr': true,
        minDate: this._state.dateFrom,
        onChange: this.#dateEndChangeHandler,
      }
    );
  }

  static parsePointToState(point) {
    return {...point,
    };
  }

  static parseStateToPoint(state) {
    const point = {...state,
      destination: state.destination.id
    };
    return point;
  }
}
