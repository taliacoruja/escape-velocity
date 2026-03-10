import { Component } from '@angular/core';
import data from '../../../assets/data.json';
import { CrewCardComponent } from './crew-card/crew-card.component';

@Component({
  selector: 'app-crew',
  standalone: true,
  imports: [CrewCardComponent],
  templateUrl: './crew.component.html',
  styleUrls: ['./crew.component.scss'],
})
export class CrewComponent {
  crew = data.crew;

  activeIndex = 0;

  get activeMember() {
    return this.crew[this.activeIndex];
  }

  selectCrew(index: number) {
    this.activeIndex = index;
  }
}
