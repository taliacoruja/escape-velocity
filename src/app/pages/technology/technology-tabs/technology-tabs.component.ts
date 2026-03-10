import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-technology-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './technology-tabs.component.html',
  styleUrls: ['./technology-tabs.component.scss'],
})
export class TechnologyTabsComponent {
  @Input() technologies: any[] = [];
  @Input() activeIndex = 0;

  @Output() select = new EventEmitter<number>();

  selectTab(index: number) {
    this.select.emit(index);
  }
}
