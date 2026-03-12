import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CrewDotsComponent } from '../crew-dots/crew-dots.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { CrewMember } from '../../../core/models/data.models';
@Component({
  selector: 'app-crew-card',
  standalone: true,
  imports: [CrewDotsComponent],
  templateUrl: './crew-card.component.html',
  styleUrls: ['./crew-card.component.scss'],
  animations: [
    trigger('crewImageChange', [
      transition('* => *', [
        style({
          opacity: 0,
          transform: 'translateX(40px)',
        }),
        animate(
          '420ms cubic-bezier(.22,.61,.36,1)',
          style({
            opacity: 1,
            transform: 'translateX(0)',
          }),
        ),
      ]),
    ]),
    trigger('crewTextChange', [
      transition('* => *', [
        style({
          opacity: 0,
          transform: 'translateY(18px)',
        }),
        animate(
          '360ms 80ms cubic-bezier(.22,.61,.36,1)',
          style({
            opacity: 1,
            transform: 'translateY(0)',
          }),
        ),
      ]),
    ]),
  ],
})
export class CrewCardComponent {
  @Input() member!: CrewMember;
  @Input() crew!: CrewMember[];
  @Input() activeIndex = 0;

  @Output() select = new EventEmitter<number>();
}
