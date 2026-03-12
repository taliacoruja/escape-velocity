import { Component } from '@angular/core';
import { TechnologyCardComponent } from './technology-card/technology-card.component';
import { DataService } from '../../core/services/data.service';
import { Technology } from '../../core/models/data.models';

@Component({
  selector: 'app-technology',
  standalone: true,
  imports: [TechnologyCardComponent],
  templateUrl: './technology.component.html',
  styleUrls: ['./technology.component.scss'],
})
export class TechnologyComponent {
  technologies: Technology[];

  constructor(private dataService: DataService) {
    this.technologies = this.dataService.technology;
  }

  activeIndex = 0;

  get activeTechnology(): Technology {
    return this.technologies[this.activeIndex];
  }

  selectTechnology(index: number) {
    this.activeIndex = index;
  }
}
