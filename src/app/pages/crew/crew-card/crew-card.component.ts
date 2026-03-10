import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CrewDotsComponent } from '../crew-dots/crew-dots.component';

export interface CrewMember {
  name: string;
  role: string;
  bio: string;
  images: {
    png: string;
    webp: string;
  };
}

@Component({
  selector: 'app-crew-card',
  standalone: true,
  imports: [CrewDotsComponent],
  templateUrl: './crew-card.component.html',
  styleUrls: ['./crew-card.component.scss'],
})
export class CrewCardComponent {
  @Input() member!: CrewMember;
  @Input() crew!: CrewMember[];
  @Input() activeIndex = 0;

  @Output() select = new EventEmitter<number>();
}
