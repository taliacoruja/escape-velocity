import { Component, OnInit } from '@angular/core';
import data from '../../../assets/data.json';
import { DestinationCardComponent } from './components/destination-card/destination-card.component';

@Component({
  selector: 'app-destination',
  imports: [DestinationCardComponent],
  standalone: true,
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.scss'],
})
export class DestinationComponent implements OnInit {
  destinations = data.destinations;

  activeIndex = 0;

  get activeDestination() {
    return this.destinations[this.activeIndex];
  }

  selectDestination(index: number) {
    this.activeIndex = index;
  }

  ngOnInit(): void {}
}
