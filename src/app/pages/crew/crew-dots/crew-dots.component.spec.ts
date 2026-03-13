import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrewDotsComponent } from './crew-dots.component';
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

describe('CrewDotsComponent', () => {
  let component: CrewDotsComponent;
  let fixture: ComponentFixture<CrewDotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrewDotsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CrewDotsComponent);
    component = fixture.componentInstance;

    component.crew = mockCrew;
    component.activeIndex = 0;

    fixture.detectChanges();
  });

  // Basic check - component initializes without errors
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // One dot per crew member
  it('should render a dot for each crew member', () => {
    const dots = fixture.nativeElement.querySelectorAll('.crew-dots__dot');
    expect(dots.length).toBe(mockCrew.length);
  });

  // is-active class must follow activeIndex
  it('should mark the active dot with is-active class', () => {
    const dots = fixture.nativeElement.querySelectorAll('.crew-dots__dot');
    expect(dots[0].classList).toContain('is-active');
    expect(dots[1].classList).not.toContain('is-active');
  });

  it('should update is-active class when activeIndex changes', () => {
    component.activeIndex = 1;
    fixture.detectChanges();

    const dots = fixture.nativeElement.querySelectorAll('.crew-dots__dot');
    expect(dots[0].classList).not.toContain('is-active');
    expect(dots[1].classList).toContain('is-active');
  });

  // role="tablist" and role="tab" are required for screen reader navigation
  it('should have correct ARIA roles', () => {
    const list = fixture.nativeElement.querySelector('.crew-dots');
    const dots = fixture.nativeElement.querySelectorAll('.crew-dots__dot');
    expect(list?.getAttribute('role')).toBe('tablist');
    dots.forEach((dot: HTMLElement) => {
      expect(dot.getAttribute('role')).toBe('tab');
    });
  });

  it('should have aria-label on each dot', () => {
    const dots = fixture.nativeElement.querySelectorAll('.crew-dots__dot');
    dots.forEach((dot: HTMLElement) => {
      expect(dot.getAttribute('aria-label')).toBe('Crew member navigation');
    });
  });

  // selectDot() emits the clicked index via select output
  it('should emit select event with correct index when dot is clicked', () => {
    let emittedIndex: number | undefined;
    component.select.subscribe((index: number) => (emittedIndex = index));

    const dots = fixture.nativeElement.querySelectorAll('.crew-dots__dot');
    dots[1].click();

    expect(emittedIndex).toBe(1);
  });

  it('should call selectDot() when a dot is clicked', () => {
    spyOn(component, 'selectDot');
    const dots = fixture.nativeElement.querySelectorAll('.crew-dots__dot');
    dots[0].click();
    expect(component.selectDot).toHaveBeenCalledWith(0);
  });
});
