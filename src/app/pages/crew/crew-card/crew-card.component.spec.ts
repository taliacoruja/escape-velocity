import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CrewCardComponent } from './crew-card.component';
import { CrewMember } from '../../../core/models/data.models';

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

describe('CrewCardComponent', () => {
  let component: CrewCardComponent;
  let fixture: ComponentFixture<CrewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrewCardComponent],
      // provideAnimations() is required because the component uses
      // @crewImageChange and @crewTextChange triggers
      providers: [provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(CrewCardComponent);
    component = fixture.componentInstance;

    // @Input() member and crew are required -
    // without them the template throws before detectChanges()
    component.member = mockCrew[0];
    component.crew = mockCrew;
    component.activeIndex = 0;

    fixture.detectChanges();
  });

  // Basic check - component initializes without errors
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render member role', () => {
    const role = fixture.nativeElement.querySelector('.crew-card__role');
    expect(role?.textContent?.trim()).toBe('Commander');
  });

  it('should render member name', () => {
    const name = fixture.nativeElement.querySelector('.crew-card__name');
    expect(name?.textContent?.trim()).toBe('Douglas Hurley');
  });

  it('should render member bio', () => {
    const bio = fixture.nativeElement.querySelector('.crew-card__bio');
    expect(bio?.textContent?.trim()).toBe(
      'Douglas Gerald Hurley is an American engineer.',
    );
  });

  // img alt must match member name - important for accessibility
  it('should set correct alt on the image', () => {
    const img = fixture.nativeElement.querySelector('.crew-card__image');
    expect(img?.getAttribute('alt')).toBe('Douglas Hurley');
  });

  // aria-live="polite" on text and picture - screen readers announce
  // content changes without interrupting the user
  it('should have aria-live on text and picture sections', () => {
    const text = fixture.nativeElement.querySelector('.crew-card__text');
    const picture = fixture.nativeElement.querySelector('.crew-card__picture');
    expect(text?.getAttribute('aria-live')).toBe('polite');
    expect(picture?.getAttribute('aria-live')).toBe('polite');
  });

  // select output must emit the index from the child dots component
  it('should emit select event with correct index', () => {
    let emittedIndex: number | undefined;
    component.select.subscribe((index: number) => (emittedIndex = index));
    component.select.emit(1);
    expect(emittedIndex).toBe(1);
  });
});
