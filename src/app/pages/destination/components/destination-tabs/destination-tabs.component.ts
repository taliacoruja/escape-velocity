import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-destination-tabs',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './destination-tabs.component.html',
  styleUrls: ['./destination-tabs.component.scss'],
})
export class DestinationTabsComponent {
  @Input() destinations: any[] = [];
  @Input() activeIndex = 0;

  @Output() select = new EventEmitter<number>();

  selectTab(index: number) {
    this.select.emit(index);
  }
}
