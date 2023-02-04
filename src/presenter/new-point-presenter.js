import { render, remove, RenderPosition } from '../framework/render.js';
import NewPointFormView from '../view/new-point-button-view';
import { nanoid } from 'nanoid';
import { UserAction, UpdateType } from '../const.js';
import { offersByTypes } from '../mock/mockData.js';


export default class NewPointPresenter {
  #listContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #allOffers = offersByTypes;


  #pointComponent = null;
  #newPointFormComponent = null;

  constructor({listContainer, onDataChange, onDestroy}) {
    this.#listContainer = listContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;

  }

  init() {
    if (this.#newPointFormComponent !== null) {
      return;
    }

    this.#newPointFormComponent = new NewPointFormView({
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick
    });

    render(this.#newPointFormComponent, this.#listContainer, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#newPointFormComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#newPointFormComponent);
    this.#newPointFormComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }


  #handleFormSubmit = (point) => {
    const offerByTypes = this.#allOffers.find((offer) => offer.type === point.type);
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      {id: nanoid(), offerByTypes, ...point},
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
