import { Component } from '@angular/core';
import data from '../../../assets/data.json';
import { TechnologyCardComponent } from './technology-card/technology-card.component';

@Component({
  selector: 'app-technology',
  standalone: true,
  imports: [TechnologyCardComponent],
  templateUrl: './technology.component.html',
  styleUrls: ['./technology.component.scss'],
})
export class TechnologyComponent {
  technologies = data.technology;

  activeIndex = 0;

  get activeTechnology() {
    return this.technologies[this.activeIndex];
  }

  selectTechnology(index: number) {
    this.activeIndex = index;
  }
}
