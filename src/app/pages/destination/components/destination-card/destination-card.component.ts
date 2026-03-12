import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DestinationTabsComponent } from '../destination-tabs/destination-tabs.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { Destination } from '../../../../core/models/data.models';

@Component({
  selector: 'app-destination-card',
  imports: [DestinationTabsComponent],
  standalone: true,
  templateUrl: './destination-card.component.html',
  styleUrls: ['./destination-card.component.scss'],
  animations: [
    trigger('imageChange', [
      transition('* => *', [
        style({
          opacity: 0,
          transform: 'scale(0.94)',
        }),
        animate(
          '420ms cubic-bezier(.22,.61,.36,1)',
          style({
            opacity: 1,
            transform: 'scale(1)',
          }),
        ),
      ]),
    ]),

    trigger('textChange', [
      transition('* => *', [
        style({
          opacity: 0,
          transform: 'translateY(14px)',
        }),
        animate(
          '360ms cubic-bezier(.22,.61,.36,1)',
          style({
            opacity: 1,
            transform: 'translateY(0)',
          }),
        ),
      ]),
    ]),
  ],
})
export class DestinationCardComponent {
  @Input() destination!: Destination;
  @Input() destinations!: Destination[];

  @Input() activeIndex = 0;

  @Output() select = new EventEmitter<number>();
}
