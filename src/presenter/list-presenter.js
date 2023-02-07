import { render, remove, RenderPosition } from '../framework/render.js';
import PointListView from '../view/point-list-view.js';
import ListSortView from '../view/list-sort-view.js';
import NoPointView from '../view/empty-points-view.js';
import LoadingView from '../view/loading-view.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import { SortType, FilterType, UpdateType, UserAction } from '../const.js';
import { sortPointDay, sortPointPrice } from '../utils.js';
import { filter } from '../filter.js';

export default class ListPresenter {
  #listContainer = null;
  #pointsModel = null;
  #filterModel = null;
  #listComponent = new PointListView();
  #loadingComponent = new LoadingView();
  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;
  #currentFilterType = FilterType.EVERYTHING;
  #filterType = FilterType.EVERYTHING;
  #sortComponent = null;
  #noPointComponent = null;
  #newPointPresenter = null;
  #isLoading = true;

  constructor({listContainer, pointsModel, filterModel, onNewPointDestroy}) {
    this.#listContainer = listContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#newPointPresenter = new NewPointPresenter({
      listContainer: this.#listComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filterPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filterPoints.sort(sortPointDay);
      case SortType.PRICE:
        return filterPoints.sort(sortPointPrice);
    }

    return this.#pointsModel.points;
  }

  init() {
    this.#renderList();
  }

  createPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init();
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearList();
        this.#renderList();
        break;
      case UpdateType.MAJOR:
        this.#clearList({resetSortType: true, resetFilterType: true});
        this.#renderList();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderSort();
        this.#renderList();
        break;
    }
  };

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearList();
    this.#renderList();
  };

  #renderPoint(point) {
    const pointPresenters = new PointPresenter({
      listContainer: this.#listComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });

    pointPresenters.init(point);
    this.#pointPresenters.set(point.id, pointPresenters);
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#listComponent.element, RenderPosition.BEFOREBEGIN);
  }

  #renderSort() {
    this.#sortComponent = new ListSortView({
      onSortTypeChange: this.#handleSortTypeChange
    });
    if (this.#pointsModel.points.every((point) => point === null)) {
      return;
    }
    render (this.#sortComponent, this.#listComponent.element, RenderPosition.BEFOREBEGIN);
  }

  #renderNoPointComponent() {
    this.#noPointComponent = new NoPointView ({
      filterType: this.#filterType
    });

    render(this.#noPointComponent, this.#listComponent.element, RenderPosition.BEFOREBEGIN);
  }

  #clearSort() {
    remove(this.#sortComponent);
  }

  #clearList({resetSortType = false, resetFilterType = false} = {}) {

    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#loadingComponent);

    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
      this.#clearSort();
      this.#renderSort();
    }

    if (resetFilterType) {
      this.#currentFilterType = FilterType.EVERYTHING;
    }
  }

  #renderList() {
    render(this.#listComponent, this.#listContainer);

    const points = this.points;
    const pointCount = points.length;

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (pointCount === 0) {
      this.#renderNoPointComponent();
    }

    for (let i = 0; i < pointCount; i++) {
      this.#renderPoint(points[i]);
    }
  }
}
