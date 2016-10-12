import { pluck } from 'rxjs/operator/pluck';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'cl-preview-container',
  template: `
    <cl-toolbar></cl-toolbar>
    <cl-stage>
      
      <cl-renderer [id]="caseID$ | async"></cl-renderer>
    </cl-stage>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
    }
  `]
})
export class PreviewContainerComponent {
  caseID$: Observable<string>;

  constructor(route: ActivatedRoute) {
    this.caseID$ = pluck.call(route.params, 'caseID');
  }
}