import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologyTabsComponent } from './technology-tabs.component';

describe('TechnologyTabsComponent', () => {
  let component: TechnologyTabsComponent;
  let fixture: ComponentFixture<TechnologyTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnologyTabsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnologyTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
