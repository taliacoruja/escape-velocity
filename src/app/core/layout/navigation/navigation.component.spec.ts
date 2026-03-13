import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NavigationComponent } from './navigation.component';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationComponent],
      // NavigationComponent uses routerLink and routerLinkActive
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Basic check - component initializes without errors
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Nav is closed by default
  it('should have isOpen set to false on init', () => {
    expect(component.isOpen).toBeFalse();
  });

  // is-open class controls the visible state of the nav
  it('should not have is-open class when isOpen is false', () => {
    const nav = fixture.nativeElement.querySelector('.nav');
    expect(nav.classList).not.toContain('is-open');
  });

  it('should add is-open class when isOpen is true', () => {
    component.isOpen = true;
    fixture.detectChanges();

    const nav = fixture.nativeElement.querySelector('.nav');
    expect(nav.classList).toContain('is-open');
  });

  // Overlay is only rendered when menu is open -
  // it blocks interaction with the page behind the nav
  it('should not render overlay when isOpen is false', () => {
    const overlay = fixture.nativeElement.querySelector('.nav-overlay');
    expect(overlay).toBeFalsy();
  });

  it('should render overlay when isOpen is true', () => {
    component.isOpen = true;
    fixture.detectChanges();

    const overlay = fixture.nativeElement.querySelector('.nav-overlay');
    expect(overlay).toBeTruthy();
  });

  it('should emit close when overlay is clicked', () => {
    component.isOpen = true;
    fixture.detectChanges();

    let emitted = false;
    component.close.subscribe(() => (emitted = true));

    const overlay = fixture.nativeElement.querySelector('.nav-overlay');
    overlay.click();

    expect(emitted).toBeTrue();
  });

  it('should emit close when close button is clicked', () => {
    let emitted = false;
    component.close.subscribe(() => (emitted = true));

    const button = fixture.nativeElement.querySelector('.nav__close');
    button.click();

    expect(emitted).toBeTrue();
  });

  it('should have aria-label on close button', () => {
    const button = fixture.nativeElement.querySelector('.nav__close');
    expect(button.getAttribute('aria-label')).toBe('Close navigation');
  });

  it('should have id="main-navigation" on nav element', () => {
    const nav = fixture.nativeElement.querySelector('.nav');
    expect(nav.getAttribute('id')).toBe('main-navigation');
  });

  // All 4 nav links must be present
  it('should render all navigation links', () => {
    const links = fixture.nativeElement.querySelectorAll('.nav__link');
    expect(links.length).toBe(4);
  });

  it('should render correct navigation routes', () => {
    const links = fixture.nativeElement.querySelectorAll('.nav__link');
    expect(links[0].getAttribute('href')).toBe('/');
    expect(links[1].getAttribute('href')).toBe('/destination');
    expect(links[2].getAttribute('href')).toBe('/crew');
    expect(links[3].getAttribute('href')).toBe('/technology');
  });
});
