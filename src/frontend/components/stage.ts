import { Component } from '@angular/core';


@Component({
  selector: 'cl-stage',
  template: `
    <ng-content></ng-content>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
      box-sizing: border-box;
      padding: 20px;
    }
  `]
})
export class StageComponent { }