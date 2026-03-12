import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TechnologyTabsComponent } from '../technology-tabs/technology-tabs.component';
import { trigger, transition, style, animate } from '@angular/animations';

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
  animations: [
    trigger('technologyImageChange', [
      transition('* => *', [
        style({
          opacity: 0,
          transform: 'translateY(40px)',
        }),
        animate(
          '420ms cubic-bezier(.22,.61,.36,1)',
          style({
            opacity: 1,
            transform: 'translateY(0)',
          }),
        ),
      ]),
    ]),
    trigger('technologyTextChange', [
      transition('* => *', [
        style({
          opacity: 0,
          transform: 'translateY(10px)',
          filter: 'blur(6px)',
        }),
        animate(
          '360ms 100ms cubic-bezier(.22,.61,.36,1)',
          style({
            opacity: 1,
            transform: 'translateY(0)',
            filter: 'blur(0)',
          }),
        ),
      ]),
    ]),
  ],
})
export class TechnologyCardComponent {
  @Input() technology!: Technology;

  @Input() technologies!: Technology[];

  @Input() activeIndex = 0;

  @Output() select = new EventEmitter<number>();
}
