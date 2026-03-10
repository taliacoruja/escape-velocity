import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrewDotsComponent } from './crew-dots.component';

describe('CrewDotsComponent', () => {
  let component: CrewDotsComponent;
  let fixture: ComponentFixture<CrewDotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrewDotsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrewDotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
