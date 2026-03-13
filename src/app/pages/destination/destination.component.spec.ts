import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DestinationComponent } from './destination.component';
import { DataService } from '../../core/services/data.service';
import { Destination } from '../../core/models/data.models';
import { provideAnimations } from '@angular/platform-browser/animations';

// Mock data that matches the real Destination interface
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

// Replace DataService with a mock to avoid reading from the real JSON file
const mockDataService = {
  get destinations() {
    return mockDestinations;
  },
};

describe('DestinationComponent', () => {
  let component: DestinationComponent;
  let fixture: ComponentFixture<DestinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestinationComponent],
      providers: [
        { provide: DataService, useValue: mockDataService },
        provideAnimations(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Basic check - component initializes without errors
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Destinations are loaded from DataService in the constructor
  it('should load destinations from DataService', () => {
    expect(component.destinations).toEqual(mockDestinations);
  });

  // First destination is active by default
  it('should set activeIndex to 0 on init', () => {
    expect(component.activeIndex).toBe(0);
  });

  // activeDestination is a getter - it must return the correct item by index
  it('should return correct activeDestination based on activeIndex', () => {
    expect(component.activeDestination).toEqual(mockDestinations[0]);

    component.activeIndex = 1;
    expect(component.activeDestination).toEqual(mockDestinations[1]);
  });

  // selectDestination() is called from the child component via (select) output
  it('should update activeIndex when selectDestination is called', () => {
    component.selectDestination(1);
    expect(component.activeIndex).toBe(1);
  });

  it('should render the page heading', () => {
    const h1 = fixture.nativeElement.querySelector('h1.destination__title');
    expect(h1?.textContent?.trim()).toContain('Pick your destination');
  });

  // aria-hidden="true" on the number span - screen readers should skip it
  it('should have aria-hidden on the decorative number span', () => {
    const span = fixture.nativeElement.querySelector('.destination__number');
    expect(span?.getAttribute('aria-hidden')).toBe('true');
  });
});
