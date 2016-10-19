import { Component, Input } from '@angular/core';
import { Experiment, ExperimentCase } from '../models/experiment';


@Component({
  selector: 'cl-nav',
  template: `
    <nav>
      <div *ngFor="let experiment of experiments" class="experiment">
        <span class="experimentName">
          {{ experiment.name }}
        </span>

        <nav class="cases">
          <a 
            *ngFor="let c of experiment.cases" 
            [routerLink]="[ '/', 'experiment', 'preview', experiment.id, c.id ]"
            routerLinkActive="caseLinkActive"
            class="caseLink">
            {{ c.description }}
          </a>
        </nav>
      </div>
    </nav>
  `,
  styles: [`
    :host {
      display: block;
      padding: 16px;
      width: 220px;
      max-height: 100vh;
      overflow: auto;
      box-sizing: border-box;
    }

    span, a {
      font-family: 'Open Sans', sans-serif;
      color: #EEEFF7;
    }

    .experiment:not(:last-child) {
      padding-bottom: 10px;
      margin-bottom: 20px;
      border-bottom: 2px solid #232730;
    }

    .experimentName {
      display: block;
      font-size: 13px;
      margin: 12px 0 8px;
      padding: 0px 8px;
    }

    .caseLink {
      font-size: 11px;
      color: #626D79;
      display: block;
      text-decoration: none;
      margin: 10px 0px;
      padding: 8px;
      margin: 4px 0px;
      transition: all 200ms;
    }

    .caseLink.caseLinkActive, .caseLink:hover {
      color: white;
      background-color: #1D202B;
    }
  `]
})
export class NavComponent {
  @Input() experiments: Experiment[];
  @Input() activeCase: ExperimentCase;
}