import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DestinationTabsComponent } from './destination-tabs.component';
import { Destination } from '../../../../core/models/data.models';

const mockDestinations: Destination[] = [
  {
    name: 'Moon',
    images: { png: 'moon.png', webp: 'moon.webp' },
    description: 'Moon description',
    distance: '384,400 km',
    travel: '3 days',
  },
  {
    name: 'Mars',
    images: { png: 'mars.png', webp: 'mars.webp' },
    description: 'Mars description',
    distance: '225 mil. km',
    travel: '9 months',
  },
];

describe('DestinationTabsComponent', () => {
  let component: DestinationTabsComponent;
  let fixture: ComponentFixture<DestinationTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestinationTabsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DestinationTabsComponent);
    component = fixture.componentInstance;

    component.destinations = mockDestinations;
    component.activeIndex = 0;

    fixture.detectChanges();
  });

  // Basic check - component initializes without errors
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // One button per destination
  it('should render a tab button for each destination', () => {
    const buttons = fixture.nativeElement.querySelectorAll(
      '.destination-tabs__button',
    );
    expect(buttons.length).toBe(mockDestinations.length);
  });

  it('should render correct destination names on buttons', () => {
    const buttons = fixture.nativeElement.querySelectorAll(
      '.destination-tabs__button',
    );
    expect(buttons[0]?.textContent?.trim()).toBe('Moon');
    expect(buttons[1]?.textContent?.trim()).toBe('Mars');
  });

  // is-active class must follow activeIndex
  it('should mark the active tab with is-active class', () => {
    const buttons = fixture.nativeElement.querySelectorAll(
      '.destination-tabs__button',
    );
    expect(buttons[0].classList).toContain('is-active');
    expect(buttons[1].classList).not.toContain('is-active');
  });

  it('should update is-active class when activeIndex changes', () => {
    component.activeIndex = 1;
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll(
      '.destination-tabs__button',
    );
    expect(buttons[0].classList).not.toContain('is-active');
    expect(buttons[1].classList).toContain('is-active');
  });

  // aria-selected must reflect which tab is currently active
  it('should set aria-selected correctly on buttons', () => {
    const buttons = fixture.nativeElement.querySelectorAll(
      '.destination-tabs__button',
    );
    expect(buttons[0].getAttribute('aria-selected')).toBe('true');
    expect(buttons[1].getAttribute('aria-selected')).toBe('false');
  });

  // role="tablist" and role="tab" are required for screen reader tab navigation
  it('should have correct ARIA roles', () => {
    const list = fixture.nativeElement.querySelector('.destination-tabs__list');
    const buttons = fixture.nativeElement.querySelectorAll(
      '.destination-tabs__button',
    );
    expect(list?.getAttribute('role')).toBe('tablist');
    buttons.forEach((button: HTMLElement) => {
      expect(button.getAttribute('role')).toBe('tab');
    });
  });

  // selectTab() emits the clicked index via select output
  it('should emit select event with correct index when tab is clicked', () => {
    let emittedIndex: number | undefined;
    component.select.subscribe((index: number) => (emittedIndex = index));

    const buttons = fixture.nativeElement.querySelectorAll(
      '.destination-tabs__button',
    );
    buttons[1].click();

    expect(emittedIndex).toBe(1);
  });

  it('should call selectTab() when a tab is clicked', () => {
    spyOn(component, 'selectTab');
    const buttons = fixture.nativeElement.querySelectorAll(
      '.destination-tabs__button',
    );
    buttons[0].click();
    expect(component.selectTab).toHaveBeenCalledWith(0);
  });
});
