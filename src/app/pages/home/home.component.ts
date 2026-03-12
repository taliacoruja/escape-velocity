import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private preloadLinks: HTMLLinkElement[] = [];
  constructor(private router: Router) {}

  goToDestination() {
    this.router.navigate(['/destination']);
  }

  ngOnInit() {
    const desktop = document.createElement('link');
    desktop.rel = 'preload';
    desktop.as = 'image';
    desktop.href = '../../../assets/imgs/home/background-home-desktop.jpg';
    desktop.media = '(min-width: 768px)';

    const mobile = document.createElement('link');
    mobile.rel = 'preload';
    mobile.as = 'image';
    mobile.href = '../../../assets/imgs/home/background-home-mobile.jpg';
    mobile.media = '(max-width: 767px)';

    document.head.append(desktop, mobile);

    this.preloadLinks.push(desktop, mobile);
  }

  ngOnDestroy() {
    this.preloadLinks.forEach((link) => link.remove());
  }
}
