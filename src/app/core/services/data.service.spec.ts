import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
  });

  // Basic check - service initializes without errors
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Getters must return non-empty arrays - data.json is loaded correctly
  it('should return destinations', () => {
    expect(service.destinations.length).toBeGreaterThan(0);
  });

  it('should return crew', () => {
    expect(service.crew.length).toBeGreaterThan(0);
  });

  it('should return technology', () => {
    expect(service.technology.length).toBeGreaterThan(0);
  });

  // Each item must have required fields defined by the interface
  it('should return destinations with required fields', () => {
    service.destinations.forEach((d) => {
      expect(d.name).toBeTruthy();
      expect(d.description).toBeTruthy();
      expect(d.distance).toBeTruthy();
      expect(d.travel).toBeTruthy();
      expect(d.images.png).toBeTruthy();
      expect(d.images.webp).toBeTruthy();
    });
  });

  it('should return crew with required fields', () => {
    service.crew.forEach((m) => {
      expect(m.name).toBeTruthy();
      expect(m.role).toBeTruthy();
      expect(m.bio).toBeTruthy();
      expect(m.images.png).toBeTruthy();
      expect(m.images.webp).toBeTruthy();
    });
  });

  it('should return technology with required fields', () => {
    service.technology.forEach((t) => {
      expect(t.name).toBeTruthy();
      expect(t.description).toBeTruthy();
      expect(t.images.portrait).toBeTruthy();
      expect(t.images.landscape).toBeTruthy();
    });
  });
});
