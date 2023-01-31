import PointsListView from '../view/point-list-view.js';
import AddNewPointView from '../view/add-new-point-view.js';
import EmptyPointsView from '../view/empty-points-view.js';
import ListSortView from '../view/list-sort-view.js';
import { render } from '../framework/render.js';
import PointPresenter from './point-presenter.js';

export default class PointsListPresenter {
  #pointListContainer = null;
  #pointsModel = null;

  #pointPresenters = [];

  #points = [];

  #pointsListComponent = new PointsListView();
  #noPointsMessageComponent = new EmptyPointsView();
  #listSortComponent = new ListSortView();

  constructor(pointListContainer, pointsModel) {
    this.#pointListContainer = pointListContainer;
    this.#pointsModel = pointsModel;
  }

  #closeAllEdits = () => {
    this.#pointPresenters.forEach((presenter) => {
      presenter.resetView();
    });
  };

  #renderPoint(point) {
    const pointPresenter = new PointPresenter(this.#pointsListComponent.element, this.#closeAllEdits);
    pointPresenter.init(point);
    this.#pointPresenters.push(pointPresenter);
  }

  #renderBoard() {
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

  init() {
    this.#points = [...this.#pointsModel.points];

    this.#renderBoard();
  }

}

export { AddNewPointView };
