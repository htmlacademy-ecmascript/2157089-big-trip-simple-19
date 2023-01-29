import FilterView from './view/filter-view.js';
//import ListSortView from './view/List-Sort-View.js';
import { render } from './framework/render.js';
import Presenter from './presenter/presenter.js';
import PointsModel from './model/points-model.js';

const tripMainElement = document.querySelector('.trip-main');
const tripMainTripControlsElement = tripMainElement.querySelector('.trip-main__trip-controls');
const tripControlsFiltersElement = tripMainTripControlsElement.querySelector('.trip-controls__filters');

const bodyElement = document.querySelector('.page-body');
const bodyPageMainElement = bodyElement.querySelector('.page-body__page-main');
const tripEventsElement = bodyPageMainElement.querySelector('.trip-events');

const pointsModel = new PointsModel();
const tripListPresenter = new Presenter(tripEventsElement, pointsModel);

render(new FilterView(), tripControlsFiltersElement);
//render(new ListSortView(), tripEventsElement);
tripListPresenter.init();
