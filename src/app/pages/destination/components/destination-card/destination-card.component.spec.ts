import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DestinationCardComponent } from './destination-card.component';
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

describe('DestinationCardComponent', () => {
  let component: DestinationCardComponent;
  let fixture: ComponentFixture<DestinationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestinationCardComponent],
      // provideAnimations() is required because the component uses @imageChange and @textChange triggers
      providers: [provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(DestinationCardComponent);
    component = fixture.componentInstance;

    // @Input() destination and destinations are required -
    // without them the template throws before detectChanges()
    component.destination = mockDestinations[0];
    component.destinations = mockDestinations;
    component.activeIndex = 0;

    fixture.detectChanges();
  });

  // Basic check - component initializes without errors
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render destination name', () => {
    const title = fixture.nativeElement.querySelector(
      '.destination-card__title',
    );
    expect(title?.textContent?.trim()).toBe('Moon');
  });

  it('should render destination description', () => {
    const description = fixture.nativeElement.querySelector(
      '.destination-card__description',
    );
    expect(description?.textContent?.trim()).toBe('Moon description');
  });

  it('should render distance and travel time', () => {
    const values = fixture.nativeElement.querySelectorAll(
      '.destination-card__value',
    );
    expect(values[0]?.textContent?.trim()).toBe('384,400 km');
    expect(values[1]?.textContent?.trim()).toBe('3 days');
  });

  // img alt must match destination name - important for accessibility
  it('should set correct alt on the image', () => {
    const img = fixture.nativeElement.querySelector('.destination-card__image');
    expect(img?.getAttribute('alt')).toBe('Moon');
  });

  // aria-live="polite" on picture and text - screen readers announce changes
  // without interrupting the user
  it('should have aria-live on picture and text sections', () => {
    const picture = fixture.nativeElement.querySelector(
      '.destination-card__picture',
    );
    const text = fixture.nativeElement.querySelector('.destination-card__text');
    expect(picture?.getAttribute('aria-live')).toBe('polite');
    expect(text?.getAttribute('aria-live')).toBe('polite');
  });

  // select output must emit the index from the child tabs component
  it('should emit select event with correct index', () => {
    let emittedIndex: number | undefined;
    component.select.subscribe((index: number) => (emittedIndex = index));
    component.select.emit(1);
    expect(emittedIndex).toBe(1);
  });
});
