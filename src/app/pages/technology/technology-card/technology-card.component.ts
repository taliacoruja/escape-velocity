import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TechnologyTabsComponent } from '../technology-tabs/technology-tabs.component';

export interface Technology {
  name: string;
  description: string;
  images: {
    portrait: string;
    landscape: string;
  };
}

@Component({
  selector: 'app-technology-card',
  standalone: true,
  imports: [TechnologyTabsComponent],
  templateUrl: './technology-card.component.html',
  styleUrls: ['./technology-card.component.scss'],
})
export class TechnologyCardComponent {
  @Input() technology!: Technology;

  @Input() technologies!: Technology[];

  @Input() activeIndex = 0;

  @Output() select = new EventEmitter<number>();
}
