import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ExperimentRegistryService } from '../services/experiment-registry';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Experiment, ExperimentCase } from '../models/experiment';

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
  sub: Subscription;

  constructor(
    registry: ExperimentRegistryService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.experiments = registry.getAllExperiments();
    this.sub = this.router.events
      .filter(event => event instanceof NavigationEnd)
      .do(() => {
        if (this.route.children.length === 0 && this.experiments.length > 0) {
          const [ experiment ]: Experiment[] = this.experiments;
          const [ expCase ]: ExperimentCase[] = experiment.cases;

          this.router.navigate(['/experiment/preview', experiment.id, expCase.id]);
        }
      })
      .subscribe();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}