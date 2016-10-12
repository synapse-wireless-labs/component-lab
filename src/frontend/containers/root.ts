import { Component } from '@angular/core';
import { ExperimentRegistryService } from '../services/experiment-registry';


@Component({
  selector: 'cl-root-container',
  template: `
    <cl-layout>
      <cl-nav [experiments]="experiments"></cl-nav>

      <div class="grow">
        <router-outlet></router-outlet>
      </div>
    </cl-layout>
  `,
  styles: [`
    .grow {
      flex-grow: 5;
    }
  `]
})
export class RootContainerComponent {
  experiments: any[];

  constructor(registry: ExperimentRegistryService) {
    this.experiments = registry.getAllExperiments();
  }
}