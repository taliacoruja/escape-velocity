import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DestinationTabsComponent } from '../destination-tabs/destination-tabs.component';

export interface Destination {
  name: string;
  images: {
    png: string;
    webp: string;
  };
  description: string;
  distance: string;
  travel: string;
}

@Component({
  selector: 'app-destination-card',
  imports: [DestinationTabsComponent],
  standalone: true,
  templateUrl: './destination-card.component.html',
  styleUrls: ['./destination-card.component.scss'],
})
export class DestinationCardComponent {
  @Input() destination!: Destination;
  @Input() destinations!: Destination[];

  @Input() activeIndex = 0;

  @Output() select = new EventEmitter<number>();
}
