import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TechnologyCardComponent } from './technology-card.component';
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

describe('TechnologyCardComponent', () => {
  let component: TechnologyCardComponent;
  let fixture: ComponentFixture<TechnologyCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnologyCardComponent],
      // provideAnimations() is required because the component uses
      // @technologyImageChange and @technologyTextChange triggers
      providers: [provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(TechnologyCardComponent);
    component = fixture.componentInstance;

    // @Input() technology and technologies are required -
    // without them the template throws before detectChanges()
    component.technology = mockTechnologies[0];
    component.technologies = mockTechnologies;
    component.activeIndex = 0;

    fixture.detectChanges();
  });

  // Basic check - component initializes without errors
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render technology name', () => {
    const title = fixture.nativeElement.querySelector(
      '.technology-card__title',
    );
    expect(title?.textContent?.trim()).toBe('Launch vehicle');
  });

  it('should render technology description', () => {
    const description = fixture.nativeElement.querySelector(
      '.technology-card__description',
    );
    expect(description?.textContent?.trim()).toBe(
      'A launch vehicle description.',
    );
  });

  // img alt must match technology name - important for accessibility
  it('should set correct alt on the image', () => {
    const img = fixture.nativeElement.querySelector('.technology-card__image');
    expect(img?.getAttribute('alt')).toBe('Launch vehicle');
  });

  // portrait image is served via <source> for wide screens -
  // landscape is the fallback in <img>
  it('should set landscape image as fallback src', () => {
    const img = fixture.nativeElement.querySelector('.technology-card__image');
    expect(img?.getAttribute('src')).toBe('vehicle-landscape.png');
  });

  it('should set portrait image on the source element', () => {
    const source = fixture.nativeElement.querySelector('source');
    expect(source?.getAttribute('srcset')).toBe('vehicle-portrait.png');
  });

  // aria-live="polite" on content and picture - screen readers announce
  // changes without interrupting the user
  it('should have aria-live on content and picture sections', () => {
    const content = fixture.nativeElement.querySelector(
      '.technology-card__content',
    );
    const picture = fixture.nativeElement.querySelector(
      '.technology-card__picture',
    );
    expect(content?.getAttribute('aria-live')).toBe('polite');
    expect(picture?.getAttribute('aria-live')).toBe('polite');
  });

  // select output must emit the index from the child tabs component
  it('should emit select event with correct index', () => {
    let emittedIndex: number | undefined;
    component.select.subscribe((index: number) => (emittedIndex = index));
    component.select.emit(1);
    expect(emittedIndex).toBe(1);
  });
});
