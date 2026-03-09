import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/layout/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <div class="layout">
      <app-header></app-header>

      <main class="layout__content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
})
export class AppComponent {}
