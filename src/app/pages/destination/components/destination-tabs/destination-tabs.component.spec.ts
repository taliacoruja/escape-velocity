import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationTabsComponent } from './destination-tabs.component';

describe('DestinationTabsComponent', () => {
  let component: DestinationTabsComponent;
  let fixture: ComponentFixture<DestinationTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestinationTabsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DestinationTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
