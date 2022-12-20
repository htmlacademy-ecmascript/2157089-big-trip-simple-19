import { NewPointFormView } from '../view/create-form-view.js';
import { NewPointEditFormView } from '../view/edit-form-view.js';
import { NewPointFilterView } from '../view/filter-view.js';
import { NewPointSortView } from '../view/sort-view.js';
import { NewPointWaypointView } from '../view/waypoint-view.js';
import { render, RenderPosition } from '../render.js';

const filterContainer = document.querySelector('.trip-controls__filters');
const mainContainer = document.querySelector('.trip-events');

export default class Presenter {
  init() {
    render(new NewPointFilterView(), filterContainer, RenderPosition.AFTERBEGIN);
    render(new NewPointSortView(), mainContainer, RenderPosition.AFTERBEGIN);
    render(new NewPointFormView(), mainContainer, RenderPosition.BEFOREEND);
    for (let i = 0; i < 3; i++) {
      render(new NewPointWaypointView(), mainContainer, RenderPosition.BEFOREEND);
    }
    render(new NewPointEditFormView(), mainContainer, RenderPosition.BEFOREEND);
  }
}
