import { render, remove, RenderPosition } from '../framework/render.js';
import AddNewPointView from '../view/add-new-point-view.js';
import { UserAction, UpdateType } from '../const.js';

export default class NewPointPresenter {
  #listContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #point = null;
  #newPointFormComponent = null;

  constructor({listContainer, onDataChange, onDestroy}) {
    this.#listContainer = listContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init(point) {
    if (this.#newPointFormComponent !== null) {
      return;
    }

    this.#point = point;
    this.#newPointFormComponent = new AddNewPointView({
      point: this.#point,
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

  setSaving() {
    this.#newPointFormComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#newPointFormComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#newPointFormComponent.shake(resetFormState);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MAJOR,
      point,
    );
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
