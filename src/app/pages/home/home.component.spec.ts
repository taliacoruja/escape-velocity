import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;

  // Instead of the real Router we pass a mock with a spy -
  // so we can track navigate() calls without actual navigation
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        {
          provide: Router,
          useValue: { navigate: jasmine.createSpy('navigate') },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);

    // Triggers the first change detection cycle and renders the template
    fixture.detectChanges();
  });

  // ** Rendering **

  // Basic check - component initializes without errors
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Compound selector 'h1.home__title' checks both the tag and the class at once
  it('should render the main heading', () => {
    const h1 = fixture.nativeElement.querySelector('h1.home__title');
    expect(h1?.textContent?.trim()).toBe('Space');
  });

  it('should render the explore button', () => {
    const button = fixture.nativeElement.querySelector('.home__explore-button');
    expect(button).toBeTruthy();
  });

  // ** Navigation **

  it('should navigate to /destination when explore button is clicked', () => {
    const button = fixture.nativeElement.querySelector('.home__explore-button');
    button.click();
    expect(router.navigate).toHaveBeenCalledWith(['/destination']);
  });

  // spyOn intercepts the method call - this way we test the template binding
  // independently of the Router
  it('should call goToDestination() when button is clicked', () => {
    spyOn(component, 'goToDestination');
    const button = fixture.nativeElement.querySelector('.home__explore-button');
    button.click();
    expect(component.goToDestination).toHaveBeenCalled();
  });

  // ** Accessibility **

  // Without aria-label screen readers can't describe the button's purpose accurately
  it('should have aria-label on explore button', () => {
    const button = fixture.nativeElement.querySelector('.home__explore-button');
    expect(button?.getAttribute('aria-label')).toBe(
      'Explore space destinations',
    );
  });

  // Without explicit type="button" the browser may treat it as type="submit"
  // and trigger an unintended form submission
  it('should have type="button" on explore button', () => {
    const button = fixture.nativeElement.querySelector('.home__explore-button');
    expect(button?.getAttribute('type')).toBe('button');
  });
});
