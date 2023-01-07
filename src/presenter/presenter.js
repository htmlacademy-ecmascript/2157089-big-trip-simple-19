import TripPointListView from '../view/point-list-view.js';
import AddNewPointView from '../view/create-form-view.js';
import EditPointView from '../view/edit-form-view.js';
import DestinationItemView from '../view/waypoint-view.js';
import { render } from '../render.js';

export default class TripListPresenter {
  tripListComponent = new TripPointListView();

  constructor(tripListContainer, pointsModel) {
    this.tripListContainer = tripListContainer;
    this.pointsModel = pointsModel;
  }

  init () {
    this.points = [...this.pointsModel.getPoints()];

    render(this.tripListComponent, this.tripListContainer);
    render(new EditPointView(this.points[0]), this.tripListComponent.getElement());

    for (let i = 0; i < this.points.length; i++) {
      render(new DestinationItemView(this.points[i]), this.tripListComponent.getElement());
    }

  }

}

export { AddNewPointView };
