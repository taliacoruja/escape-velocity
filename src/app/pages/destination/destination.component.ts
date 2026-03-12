import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { DestinationCardComponent } from './components/destination-card/destination-card.component';
import { Destination } from '../../core/models/data.models';

@Component({
  selector: 'app-destination',
  imports: [DestinationCardComponent],
  standalone: true,
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.scss'],
})
export class DestinationComponent implements OnInit {
  destinations: Destination[];

  constructor(private dataService: DataService) {
    this.destinations = this.dataService.destinations;
  }

  activeIndex = 0;

  get activeDestination(): Destination {
    return this.destinations[this.activeIndex];
  }

  selectDestination(index: number) {
    this.activeIndex = index;
  }

  ngOnInit(): void {}
}
