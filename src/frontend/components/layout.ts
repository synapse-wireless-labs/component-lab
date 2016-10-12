import { Component } from '@angular/core';


@Component({
  selector: 'cl-layout',
  template: `
    <ng-content></ng-content>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: row;
      min-width: 100vw;
      min-height: 100vh;
      background-color: #262A34;
      box-sizing: border-box;
    }
  `]
})
export class LayoutComponent { }