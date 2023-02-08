import ListPresenter from './presenter/list-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import NewPointButton from './view/new-point-button-view.js';
import PointApiService from './points-api-service.js';

const AUTHORIZATION = 'Basic zg5r3ghqQ4IgET5r';
const END_POINT = 'https://19.ecmascript.pages.academy/big-trip-simple';

const siteTripElement = document.querySelector('.trip-events');
const siteControlsElement = document.querySelector('.trip-controls__filters');
const pointsModel = new PointsModel({
  pointsApiService: new PointApiService(END_POINT, AUTHORIZATION)
});
const filterModel = new FilterModel();
const filterPresenter = new FilterPresenter({filterContainer: siteControlsElement, filterModel, pointsModel});
const listPresenter = new ListPresenter({listContainer: siteTripElement, filterModel, pointsModel, onNewPointDestroy: handleNewPointFormClose});

const newPointButtonElement = new NewPointButton({
  onClick: handleNewTaskButtonClick,
});

function handleNewPointFormClose() {
  newPointButtonElement.element.disabled = false;
}

function handleNewTaskButtonClick() {
  listPresenter.createPoint();
  newPointButtonElement.element.disabled = true;
}

filterPresenter.init();
listPresenter.init();
pointsModel.init();
