import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrewComponent } from './crew.component';
import { DataService } from '../../core/services/data.service';
import { CrewMember } from '../../core/models/data.models';
import { provideAnimations } from '@angular/platform-browser/animations';

const mockCrew: CrewMember[] = [
  {
    name: 'Douglas Hurley',
    images: { png: 'hurley.png', webp: 'hurley.webp' },
    role: 'Commander',
    bio: 'Douglas Gerald Hurley is an American engineer.',
  },
  {
    name: 'Mark Shuttleworth',
    images: { png: 'shuttleworth.png', webp: 'shuttleworth.webp' },
    role: 'Mission Specialist',
    bio: 'Mark Richard Shuttleworth is the founder of Ubuntu.',
  },
];

const mockDataService = {
  get crew() {
    return mockCrew;
  },
};

describe('CrewComponent', () => {
  let component: CrewComponent;
  let fixture: ComponentFixture<CrewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrewComponent],
      providers: [
        { provide: DataService, useValue: mockDataService },
        provideAnimations(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CrewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Basic check - component initializes without errors
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load crew from DataService', () => {
    expect(component.crew).toEqual(mockCrew);
  });

  // First crew member is active by default
  it('should set activeIndex to 0 on init', () => {
    expect(component.activeIndex).toBe(0);
  });

  // activeMember is a getter - must return the correct item by index
  it('should return correct activeMember based on activeIndex', () => {
    expect(component.activeMember).toEqual(mockCrew[0]);

    component.activeIndex = 1;
    expect(component.activeMember).toEqual(mockCrew[1]);
  });

  it('should update activeIndex when selectCrew is called', () => {
    component.selectCrew(1);
    expect(component.activeIndex).toBe(1);
  });

  it('should render the page heading', () => {
    const h1 = fixture.nativeElement.querySelector('h1.crew__title');
    expect(h1?.textContent?.trim()).toContain('Meet your crew');
  });

  // aria-hidden="true" on the number span - screen readers should skip it
  it('should have aria-hidden on the decorative number span', () => {
    const span = fixture.nativeElement.querySelector('.crew__number');
    expect(span?.getAttribute('aria-hidden')).toBe('true');
  });
});
