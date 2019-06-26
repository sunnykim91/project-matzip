import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-matzip></app-matzip>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
}
