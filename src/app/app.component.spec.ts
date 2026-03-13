import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      // AppComponent uses RouterOutlet and HeaderComponent which depends on Router,
      // so we need to provide it even with no routes defined
      providers: [provideRouter([])],
    }).compileComponents();
  });

  // Basic check - component initializes without errors
  it('should create', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  // Layout wrapper must be present - all pages are rendered inside it
  it('should render layout wrapper', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const layout = fixture.nativeElement.querySelector('.layout');
    expect(layout).toBeTruthy();
  });

  // router-outlet is required for page navigation to work
  it('should render router-outlet', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const outlet = fixture.nativeElement.querySelector('router-outlet');
    expect(outlet).toBeTruthy();
  });

  // app-header must be present on every page
  it('should render app-header', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const header = fixture.nativeElement.querySelector('app-header');
    expect(header).toBeTruthy();
  });
});
