import PointsListView from '../view/point-list-view.js';
import AddNewPointView from '../view/add-new-point-view.js';
import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';
import EmptyPointsView from '../view/empty-points-view.js';
import ListSortView from '../view/list-sort-view.js';
import { render } from '../framework/render.js';

export default class PointsListPresenter {
  #pointListContainer = null;
  #pointsModel = null;

  #points = [];

  #pointsListComponent = new PointsListView();
  #noPointsMessageComponent = new EmptyPointsView();
  #listSortComponent = new ListSortView();

  constructor(pointListContainer, pointsModel) {
    this.#pointListContainer = pointListContainer;
    this.#pointsModel = pointsModel;
  }

  #renderPoint (point) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceEditToPoint.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointView(point, () => {
      replacePointToEdit.call(this);
      document.addEventListener('keydown', escKeyDownHandler);
    });

    const editPointComponent = new EditPointView(point, () => {
      replaceEditToPoint.call(this);
      document.removeEventListener('keydown', escKeyDownHandler);
    });

    function replacePointToEdit () {
      this.#pointsListComponent.element.replaceChild(editPointComponent.element, pointComponent.element);
    }

    function replaceEditToPoint () {
      this.#pointsListComponent.element.replaceChild(pointComponent.element, editPointComponent.element);
    }

    render(pointComponent, this.#pointsListComponent.element);
  }

  init () {
    this.#points = [...this.#pointsModel.points];

    if(this.#points.length === 0) {
      render(this.#noPointsMessageComponent, this.#pointListContainer);
    }
    else {
      render(this.#listSortComponent, this.#pointListContainer);
      render(this.#pointsListComponent, this.#pointListContainer);
      for (const point of this.#points) {
        this.#renderPoint(point);
      }
    }
  }

}

export { AddNewPointView };
