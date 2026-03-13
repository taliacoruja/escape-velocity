import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TechnologyComponent } from './technology.component';
import { DataService } from '../../core/services/data.service';
import { Technology } from '../../core/models/data.models';
import { provideAnimations } from '@angular/platform-browser/animations';

const mockTechnologies: Technology[] = [
  {
    name: 'Launch vehicle',
    images: {
      portrait: 'vehicle-portrait.png',
      landscape: 'vehicle-landscape.png',
    },
    description: 'A launch vehicle description.',
  },
  {
    name: 'Spaceport',
    images: {
      portrait: 'spaceport-portrait.png',
      landscape: 'spaceport-landscape.png',
    },
    description: 'A spaceport description.',
  },
];

const mockDataService = {
  get technology() {
    return mockTechnologies;
  },
};

describe('TechnologyComponent', () => {
  let component: TechnologyComponent;
  let fixture: ComponentFixture<TechnologyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnologyComponent],
      providers: [
        { provide: DataService, useValue: mockDataService },
        provideAnimations(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TechnologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Basic check - component initializes without errors
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load technologies from DataService', () => {
    expect(component.technologies).toEqual(mockTechnologies);
  });

  // First technology is active by default
  it('should set activeIndex to 0 on init', () => {
    expect(component.activeIndex).toBe(0);
  });

  // activeTechnology is a getter - must return the correct item by index
  it('should return correct activeTechnology based on activeIndex', () => {
    expect(component.activeTechnology).toEqual(mockTechnologies[0]);

    component.activeIndex = 1;
    expect(component.activeTechnology).toEqual(mockTechnologies[1]);
  });

  it('should update activeIndex when selectTechnology is called', () => {
    component.selectTechnology(1);
    expect(component.activeIndex).toBe(1);
  });

  it('should render the page heading', () => {
    const h1 = fixture.nativeElement.querySelector('h1.technology__title');
    expect(h1?.textContent?.trim()).toContain('Space launch 101');
  });

  // aria-hidden="true" on the number span - screen readers should skip it
  it('should have aria-hidden on the decorative number span', () => {
    const span = fixture.nativeElement.querySelector('.technology__number');
    expect(span?.getAttribute('aria-hidden')).toBe('true');
  });
});
