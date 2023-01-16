import PointsListView from '../view/point-list-view.js';
import AddNewPointView from '../view/create-form-view.js';
import EditPointView from '../view/edit-form-view.js';
import PointView from '../view/waypoint-view.js';
import { render } from '../render.js';

export default class PointsListPresenter {
  #pointListContainer = null;
  #pointsModel = null;

  #points = [];

  #pointsListComponent = new PointsListView();

  constructor(pointListContainer, pointsModel) {
    this.#pointListContainer = pointListContainer;
    this.#pointsModel = pointsModel;
  }

  #renderPoint (point) {
    const pointComponent = new PointView(point);
    const editPointComponent = new EditPointView(point);

    const replacePointToEdit = () => {
      this.#pointsListComponent.element.replaceChild(editPointComponent.element, pointComponent.element);
    };

    const replaceEditToPoint = () => {
      this.#pointsListComponent.element.replaceChild(pointComponent.element, editPointComponent.element);
    };

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceEditToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    pointComponent.editButton.addEventListener('click', () => {
      replacePointToEdit();
      document.addEventListener('keydown', escKeyDownHandler);
    });

    editPointComponent.editButton.addEventListener('click', () => {
      replaceEditToPoint();
      document.removeEventListener('keydown', escKeyDownHandler);
    });

    editPointComponent.submitButton.addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceEditToPoint();
      document.removeEventListener('keydown', escKeyDownHandler);
    });

    render(pointComponent, this.#pointsListComponent.element);
  }

  init () {
    this.#points = [...this.#pointsModel.points];

    render(this.#pointsListComponent, this.#pointListContainer);

    for (const point of this.#points) {
      this.#renderPoint(point);
    }
  }

}

export { AddNewPointView };
