import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TechnologyTabsComponent } from './technology-tabs.component';
import { Technology } from '../../../core/models/data.models';

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

describe('TechnologyTabsComponent', () => {
  let component: TechnologyTabsComponent;
  let fixture: ComponentFixture<TechnologyTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnologyTabsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TechnologyTabsComponent);
    component = fixture.componentInstance;

    component.technologies = mockTechnologies;
    component.activeIndex = 0;

    fixture.detectChanges();
  });

  // Basic check - component initializes without errors
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // One button per technology
  it('should render a tab button for each technology', () => {
    const buttons = fixture.nativeElement.querySelectorAll(
      '.technology-tabs__button',
    );
    expect(buttons.length).toBe(mockTechnologies.length);
  });

  // Buttons display 1-based index, not the technology name
  it('should render correct numbers on buttons', () => {
    const buttons = fixture.nativeElement.querySelectorAll(
      '.technology-tabs__button',
    );
    expect(buttons[0]?.textContent?.trim()).toBe('1');
    expect(buttons[1]?.textContent?.trim()).toBe('2');
  });

  // is-active class must follow activeIndex
  it('should mark the active tab with is-active class', () => {
    const buttons = fixture.nativeElement.querySelectorAll(
      '.technology-tabs__button',
    );
    expect(buttons[0].classList).toContain('is-active');
    expect(buttons[1].classList).not.toContain('is-active');
  });

  it('should update is-active class when activeIndex changes', () => {
    component.activeIndex = 1;
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll(
      '.technology-tabs__button',
    );
    expect(buttons[0].classList).not.toContain('is-active');
    expect(buttons[1].classList).toContain('is-active');
  });

  // role="tablist" and role="tab" are required for screen reader tab navigation
  it('should have correct ARIA roles', () => {
    const list = fixture.nativeElement.querySelector('.technology-tabs');
    const buttons = fixture.nativeElement.querySelectorAll(
      '.technology-tabs__button',
    );
    expect(list?.getAttribute('role')).toBe('tablist');
    buttons.forEach((button: HTMLElement) => {
      expect(button.getAttribute('role')).toBe('tab');
    });
  });

  it('should have aria-label on each button', () => {
    const buttons = fixture.nativeElement.querySelectorAll(
      '.technology-tabs__button',
    );
    buttons.forEach((button: HTMLElement) => {
      expect(button.getAttribute('aria-label')).toBe('Technology navigation');
    });
  });

  // selectTab() emits the clicked index via select output
  it('should emit select event with correct index when tab is clicked', () => {
    let emittedIndex: number | undefined;
    component.select.subscribe((index: number) => (emittedIndex = index));

    const buttons = fixture.nativeElement.querySelectorAll(
      '.technology-tabs__button',
    );
    buttons[1].click();

    expect(emittedIndex).toBe(1);
  });

  it('should call selectTab() when a tab is clicked', () => {
    spyOn(component, 'selectTab');
    const buttons = fixture.nativeElement.querySelectorAll(
      '.technology-tabs__button',
    );
    buttons[0].click();
    expect(component.selectTab).toHaveBeenCalledWith(0);
  });
});
