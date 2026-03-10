import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crew-dots',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './crew-dots.component.html',
  styleUrls: ['./crew-dots.component.scss'],
})
export class CrewDotsComponent {
  @Input() crew: any[] = [];
  @Input() activeIndex = 0;

  @Output() select = new EventEmitter<number>();

  selectDot(index: number) {
    this.select.emit(index);
  }
}
