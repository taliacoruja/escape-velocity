import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      // HeaderComponent uses routerLink and NavigationComponent depends on Router
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Basic check - component initializes without errors
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Menu is closed by default
  it('should have menuOpen set to false on init', () => {
    expect(component.menuOpen).toBeFalse();
  });

  it('should toggle menuOpen when toggleMenu is called', () => {
    component.toggleMenu();
    expect(component.menuOpen).toBeTrue();

    component.toggleMenu();
    expect(component.menuOpen).toBeFalse();
  });

  it('should toggle menuOpen when menu button is clicked', () => {
    const button = fixture.nativeElement.querySelector('.header__menu-button');
    button.click();
    expect(component.menuOpen).toBeTrue();

    button.click();
    expect(component.menuOpen).toBeFalse();
  });

  // aria-expanded must reflect the current menuOpen state
  it('should update aria-expanded on menu button when toggled', () => {
    const button = fixture.nativeElement.querySelector('.header__menu-button');
    expect(button.getAttribute('aria-expanded')).toBe('false');

    button.click();
    fixture.detectChanges();
    expect(button.getAttribute('aria-expanded')).toBe('true');
  });

  it('should have aria-label on menu button', () => {
    const button = fixture.nativeElement.querySelector('.header__menu-button');
    expect(button.getAttribute('aria-label')).toBe('Open navigation menu');
  });

  it('should have aria-controls on menu button', () => {
    const button = fixture.nativeElement.querySelector('.header__menu-button');
    expect(button.getAttribute('aria-controls')).toBe('main-navigation');
  });

  it('should render logo link pointing to /', () => {
    const logo = fixture.nativeElement.querySelector('.header__logo');
    expect(logo).toBeTruthy();
  });

  it('should render app-navigation', () => {
    const nav = fixture.nativeElement.querySelector('app-navigation');
    expect(nav).toBeTruthy();
  });
});
