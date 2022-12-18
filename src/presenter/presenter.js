import { NewTaskFormView } from '../view/create-form.js';
import { NewTaskEditFormView } from '../view/editing-form.js';
import { NewTaskFilterView } from '../view/filter.js';
import { NewTaskSortView } from '../view/sort.js';
import { NewTaskWaypointView } from '../view/waypoint.js';
import { render, RenderPosition } from '../render.js';

const filterContainer = document.querySelector('.trip-controls__filters');
const mainContainer = document.querySelector('.trip-events');

export default class Presenter {
  init() {
    render(new NewTaskFilterView(), filterContainer, RenderPosition.AFTERBEGIN);
    render(new NewTaskSortView(), mainContainer, RenderPosition.AFTERBEGIN);
    render(new NewTaskFormView(), mainContainer, RenderPosition.BEFOREEND);
    for (let i = 0; i < 3; i++) {
      render(new NewTaskWaypointView(), mainContainer, RenderPosition.BEFOREEND);
    }
    render(new NewTaskEditFormView(), mainContainer, RenderPosition.BEFOREEND);
  }
}
