import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';
import { render, replace } from '../framework/render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #pointListContainer = null;
  #onCloseAllEdits = null;

  #pointComponent = null;
  #pointEditComponent = null;

  #point = null;

  #mode = Mode.DEFAULT;

  constructor(pointListContainer, onCloseAllEdits) {
    this.#pointListContainer = pointListContainer;
    this.#onCloseAllEdits = onCloseAllEdits;
  }

  init(point) {
    this.#point = point;

    this.#pointComponent = new PointView(
      this.#point,
      this.#handleEditClick
    );

    this.#pointEditComponent = new EditPointView(
      this.#point,
      this.#handleClose
    );

    render(this.#pointComponent, this.#pointListContainer);
  }

  #replacePointToEdit() {
    this.#onCloseAllEdits();
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.EDITING;
  }

  #replaceEditToPoint() {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceEditToPoint();
    }
  };

  #handleEditClick = () => {
    this.#replacePointToEdit();
  };

  #handleClose = () => {
    this.#replaceEditToPoint();
  };

  resetView() {
    if (this.#mode === Mode.EDITING) {
      this.#replaceEditToPoint();
    }
  }

}
