import { Component } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { CrewCardComponent } from './crew-card/crew-card.component';
import { CrewMember } from '../../core/models/data.models';

@Component({
  selector: 'app-crew',
  standalone: true,
  imports: [CrewCardComponent],
  templateUrl: './crew.component.html',
  styleUrls: ['./crew.component.scss'],
})
export class CrewComponent {
  crew: CrewMember[];

  constructor(private dataService: DataService) {
    this.crew = this.dataService.crew;
  }

  activeIndex = 0;

  get activeMember(): CrewMember {
    return this.crew[this.activeIndex];
  }

  selectCrew(index: number) {
    this.activeIndex = index;
  }
}
